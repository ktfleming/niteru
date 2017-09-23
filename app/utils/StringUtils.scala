package utils

object StringUtils {

  implicit class CharWrapper(c: Char) {
    def isHiragana: Boolean = {
      Character.UnicodeBlock.of(c) == Character.UnicodeBlock.HIRAGANA
    }

    def isKatakana: Boolean = {
      Character.UnicodeBlock.of(c) == Character.UnicodeBlock.KATAKANA
    }
  }

}
