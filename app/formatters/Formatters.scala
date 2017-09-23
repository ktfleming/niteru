package formatters

import kanji.{KanjiDic, ScoredKanji, SimilarKanji}
import play.api.libs.json._
import play.api.libs.functional.syntax._

object Formatters {
  implicit val kanjiDicFormatter: Writes[KanjiDic] = (
    (JsPath \ "kanji").write[String] and
    (JsPath \ "onYomi").write[Seq[String]] and
    (JsPath \ "kunYomi").write[Seq[String]] and
    (JsPath \ "meanings").write[Seq[String]] and
    (JsPath \ "frequency").writeNullable[Int]
  )(unlift(KanjiDic.unapply))


  implicit val scoredKanjiFormatter: Writes[ScoredKanji] = (
    (JsPath \ "value").write[String] and
    (JsPath \ "score").write[Double] and
    (JsPath \ "kanjiDic").writeNullable[KanjiDic]
  )(unlift(ScoredKanji.unapply))

  implicit val similarKanjiFormatter = new Writes[SimilarKanji] {
    override def writes(o: SimilarKanji): JsValue = Json.obj(
      "items" -> o.items
    )
  }
}