# about Jinrou-Wakamete-Log-Analyzer

Support tool for online "Are You a Werewolf?" game in Wakamete Server ( http://jinrou.dip.jp/~jinrou/ ).
You get easier to correct and analyze Chat Log.
It is Sidebar Plugins for Mozilla Firefox.

Firefoxのサイドバーを用いた、人狼ゲーム・わかめて鯖 http://jinrou.dip.jp/~jinrou/ 向けログリアルタイム分析ツール。

# Support Language

Japanese only, because Wakamete Server can support only Japanese.

わかめて鯖が日本語なので、日本語以外対応しません。あしからず。

# How to Install （どうやってインストールするの？）

1. https://github.com/stageleft/jinrou-wakamete-log-analyzer/releases に登録されている jinrou-wakamete-log-analyzer.xpi をダウンロードしてください。
1. https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/Packaging_and_installation の、
「ディスクから読み込む」セクションに従ってインストールしてください。  
インストール完了後は、 about:debugging のページを閉じてしまってかまいません。  
なお、起動のたびにインストールする必要がありますので、 about:debugging をブックマークしておくことをお勧めします。

Note: 「パッケージ化してインストールする」での手順については、今後の検討課題とさせてください。   
 https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/Distribution を読んで考えます。。。

# How to Use （どうやって使うの？）

1. インストールされた直後の状態から、サイドバーの「Go To 「汝は人狼なりや？」続わかめてエディション」をクリックし、同サイトのフレームなし版にアクセスする。

![インストール直後の状態](https://github.com/stageleft/jinrou-wakamete-analyzer/blob/master/doc/usage-1.png "インストール直後の状態")

1. 村民登録を行い、ゲームの開始を待つ。  
  （ログが日付ごとに分割されないために正しい表示とはならないものの、「ログイン → 旅人」あるいは、「過去ログ → 最近の記録」を見ても、ツールの雰囲気がおおよそわかる状態にはなる。以下、特段の説明がない場合は「過去ログ → 最近の記録」のスクリーンショットを用いる）   
  このとき、ツールの仕様の都合上、以下の注意点がある。

    1. 複数のウィンドウを開いてはいけない。
    1. 複数の画面で村を見てはいけない。

1. 村が始まったところで、サイドバーの上部に、参加者・発言数リストが表示される。  
   この状態にて、２日目夜以降はサイドバー中部にてこれまでの投票履歴を確認できる。  
   サイドバー中央の投票結果をクリックすると、クリックした投票のみがサイドバー下部のメモエリアに追記される。

1. サイドバー上部の参加者・発言数リストから、参加者名あるいは日付をクリックすると、サイドバー中央にて発言内容を確認できる。  
   サイドバー中央の発言内容をクリックすると、クリックした発言のみがサイドバー下部のメモエリアに追記される。  
   発言内容の確認後、参加者・発言数リスト左上の「投票」をクリックすると、上記の投票履歴確認画面に移動する。

1. 村の進行に合わせてログは自動で更新・取り込みされるが、発言中あるいは操作中は自動更新されない。
   わかめてサーバの仕様として、ログの更新は「発言・更新」ボタンの押下が必須となるが、発言中・操作中以外はボタン押下を自動で代替する。  
   ここで、「発言中あるいは操作中」とは、以下の条件を言う。
    * 行動内容：「発　言[発言内容]」「更　新」以外が選択されている。
    * 行動対象：「 ------------ 」以外が選択されている。
    * 発言内容：何らかの文字が入力されている（空欄以外である）。

# Modification （改造してよい？）

Mozilla Public License Version 2.0 に従った範囲で、自由に改造して、どうぞ。

# Special Thanks

* ｢汝は人狼なりや？｣続わかめてエディション サーバー管理者およびWiki管理者各位  
  http://jinrou.dip.jp/~jinrou/
* 「わかめてモバマス人狼」GMおよび参加者各位  
  https://twitter.com/mobamasjinrou  
  https://wikiwiki.jp/cinderejinro/

