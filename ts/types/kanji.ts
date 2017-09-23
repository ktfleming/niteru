export interface Kanji {
    value: string;
    kanjiDic: KanjiDic;
}

export interface KanjiDic {
    kanji: string;
    onYomi: string[];
    kunYomi: string[];
    meanings: string[];
}