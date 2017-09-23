package kanji

import com.github.tototoshi.csv.CSVReader
import forms.SearchData

import scala.math.Ordered.orderingToOrdered
import scala.collection.mutable.ArrayBuffer
import utils.StringUtils.CharWrapper

import scala.util.Try

case class KanjiWithStrokes(value: String, strokes: Seq[String])

case class ScoredKanji(value: String, score: Double, kanjiDic: Option[KanjiDic]) extends Ordered[ScoredKanji] {
  override def compare(that: ScoredKanji): Int = {
    (this.score, this.value) compare (that.score, that.value)
  }
}

case class SimilarKanji(items: Seq[ScoredKanji])

object KanjiAnalysis {
  def loadAll(): Seq[KanjiWithStrokes] = {
    val reader = CSVReader.open("data/stroke_ulrich")
    reader.all().map { line =>
      KanjiWithStrokes(line.head, line.tail)
    }
  }

  def findSimilar(kanji: String, searchData: SearchData): SimilarKanji = {
    val dicMap = if (searchData.onlyCommon) KanjiDic.commonKanjiDicMap else KanjiDic.allKanjiDicMap

    val result = dicMap.keys.map { other => ScoredKanji(other, score(kanji, other), dicMap.get(other)) }
      .filter { _.score < 0.5 }
      .filter { _.value != kanji }
      .toSeq
      .sorted
      .take(10)

    SimilarKanji(result)
  }

  def score(from: String, to: String): Double = {
    if (from == to) {
      0
    } else {
      val strokes1 = allStrokesMap.getOrElse(from, Seq())
      val strokes2 = allStrokesMap.getOrElse(to, Seq())

      val distance = editDistance(strokes1, strokes2)

      val normalizedDistance = distance.toDouble / strokes1.length.toDouble

      normalizedDistance
    }
  }

  def editDistance(from: Seq[String], to: Seq[String]): Int = {
    (from.length, to.length) match {
      case (_, _) if from == to => 0
      case (0, b) => b
      case (a, 0) => a
      case (a, b) =>
        val work1: ArrayBuffer[Int] = (0 to b).to[ArrayBuffer]
        val work2: ArrayBuffer[Int] = (0 to b).to[ArrayBuffer]

        (0 until a) foreach { i =>
          work2(0) = i + 1
          (0 until b) foreach { j =>
            val cost = if (from(i) == to(j)) 0 else 1
            work2(j + 1) = (work2(j) + 1) min (work1(j + 1) + 1) min (work1(j) + cost)
          }

          work1.indices foreach { j =>
            work1(j) = work2(j)
          }
        }

        work2(b)

    }
  }

  val allStrokesMap: Map[String, Seq[String]] = this.loadAll().map(k => k.value -> k.strokes).toMap
}

case class KanjiDic(kanji: String, onYomi: Seq[String], kunYomi: Seq[String], meanings: Seq[String], frequency: Option[Int])

object KanjiDic {
  def loadAll(): Seq[KanjiDic] = {

    val pattern = "\\{(.+?)\\}".r

    val reader = CSVReader.open("data/kanjidic_comb_utf8_fixed")
    reader.all().map { line =>
      val split = line.head.split(" ").toSeq
      val kanji = split.head
      val onYomi = split.filter(_.head.isHiragana)
      val kunYomi = split.filter(_.head.isKatakana)
      val meanings = pattern.findAllIn(line.head).toList.map((s) => s.substring(1, s.length - 1))
      val frequency = Try(split.find(_.startsWith("F")).map(_.substring(1).toInt)).toOption.flatten
      KanjiDic(kanji, onYomi, kunYomi, meanings, frequency)
    }
  }

  val allKanjiDic = this.loadAll()
  val allKanjiDicMap: Map[String, KanjiDic] = allKanjiDic.map(k => k.kanji -> k).toMap
  val commonKanjiDicMap: Map[String, KanjiDic] = allKanjiDic.filter(_.frequency.exists(_ <= 2500)).map(k => k.kanji -> k).toMap
}