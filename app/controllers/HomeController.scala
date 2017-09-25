package controllers

import com.google.inject._
import kanji.{KanjiAnalysis, KanjiDic}
import play.api.mvc._

import scala.concurrent.Future
import formatters.Formatters._
import play.api.libs.json.Json

import scala.concurrent.ExecutionContext.Implicits.global
import forms.SearchForm.searchForm
import play.api.i18n.{I18nSupport, Messages}

@Singleton
class HomeController @Inject()(override val controllerComponents: ControllerComponents) extends AbstractController(controllerComponents) with I18nSupport {

  def index = Action {
    KanjiDic.loadAll()
    Ok(views.html.index())
  }

  def similar(kanji: String) = Action.async { implicit request =>
    Future {
      searchForm.bindFromRequest.fold(
        formWithErrors => BadRequest(formWithErrors.errorsAsJson),
        searchData => {
          Ok(Json.toJson(KanjiAnalysis.findSimilar(kanji, searchData)))
        }
      )

    }
  }

}
