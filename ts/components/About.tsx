import * as React from "react";

export const About: React.StatelessComponent<{}> = () => {
    return (
        <div className="center-text about">
            Niteru searches for kanji by visual similarity. Based on Lars Yencken's <a href="https://github.com/larsyencken/simsearch">SimSearch</a>.
            Kanji readings and English meanings from <a href="http://www.edrdg.org/kanjidic/kanjidic.html">KANJIDIC</a>.
            Source code at <a href="https://github.com/kvnflm/niteru">GitHub</a>.
        </div>
    );
};
