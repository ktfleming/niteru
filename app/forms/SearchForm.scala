package forms
import play.api.data._
import play.api.data.Forms._

case class SearchData(onlyCommon: Boolean)

object SearchForm {
  val searchForm = Form(
    mapping(
      "onlyCommon" -> boolean
    )(SearchData.apply)(SearchData.unapply)
  )
}
