# ysTodoistTool

## オレオレTodoistツールです

タスクに付いているラベルを必要な時間（分）として集計、全てのタスクの完了見積もり時刻を計算するブックマークレットです

## 使用方法

下記の形式で作成したコードをブックマークに追加し、WEB版のTodoistページで実行します

```
javascript:[ysTodoistBookmarklet.min.jsのコード]
```

もしくは、下記コードをブックマークレットとすることで、最新のysTodistBookmaeklet.jsを利用します。（github上のjsを参照する）

```
javascript:!function(d,s){s=d.createElement("script");s.src="https://rawgit.com/guutarayossiy/ysTodoistTool/master/ysTodoistBookmarklet.js";d.body.appendChild(s)}(document)
```

## 作成の経緯とか

- こちらを御覧ください→[Todoistでタスクにかかる時間を見積もって完了時刻計算する方法](https://tarahako.com/todoist-taskchute)

## 更新履歴

- v1.2.0(2016.06.23) : 件数表示を追加
- v1.1.2(2016.06.09) : jQueryの短縮URLがエラーになっていたのでGoogle CDNの物を読むように変更（最初からそうすればよかった）
- v1.1.1(2016.05.22) : Mac版Chromeで日付フィルタを選択するとマウス操作ができなくなる不具合対応
- v1.1.0(2015.10.01) : 「次の7日間」での計測に対応
- v1.0.0(2015.10.01) : 新規作成
