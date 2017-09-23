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