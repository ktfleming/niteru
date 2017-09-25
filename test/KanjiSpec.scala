import forms.SearchData
import kanji.KanjiAnalysis
import org.scalatestplus.play.PlaySpec

class KanjiSpec extends PlaySpec {
  def getSimilar(kanji: String) = KanjiAnalysis.findSimilar(kanji, SearchData(false)).items.map(_.value)

  "kanji analysis" should {
    "find similar kanji" in {
      getSimilar("富") must contain("冨")
    }

    "not include the provided kanji in the results" in {
      getSimilar("猫") must not contain "猫"
    }

    "return kanji sorted by similarity" in {
      val similar = KanjiAnalysis.findSimilar("富", SearchData(false)).items
      similar.sortBy(k => (k.score, k.value)) must equal(similar)
    }

    "return Nil when input is not a recognized kanji" in {
      KanjiAnalysis.findSimilar("test", SearchData(false)).items must equal(Nil)
    }

    "filter our uncommon kanjis when onlyCommon=true" in {
      KanjiAnalysis.findSimilar("壁", SearchData(false)).items.map(_.value) must contain("璧")
      KanjiAnalysis.findSimilar("壁", SearchData(true)).items.map(_.value) must not contain "璧"
    }

    "always return 10 results" in {
      getSimilar("山").size mustEqual 10
    }
  }
}
