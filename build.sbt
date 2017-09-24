name := """niteru"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.12.3"

libraryDependencies ++= Seq(
  jdbc,
  cache,
  ws,
  "com.github.tototoshi" %% "scala-csv" % "1.3.5",
  "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.2" % Test
)

libraryDependencies += guice

enablePlugins(DockerPlugin)

mappings.in(Universal) ++= Seq(
  file("data/kanjidic_comb_utf8_fixed") -> "data/kanjidic_comb_utf8_fixed",
  file("data/stroke_ulrich") -> "data/stroke_ulrich"
)

version in Docker := "1.0.0"