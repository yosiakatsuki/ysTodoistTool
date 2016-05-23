/*
  タスクの完了時刻を見積もるブックマークレット
  Copyright (c) 2016 Yoshiaki Ogata
  version:1.1.1
 */
!function(d,f,s){
  s=d.createElement("script");
  s.src="//j.mp/1bPoAXq";
  s.onload=function(){
    f(jQuery.noConflict(1))
  };
  d.body.appendChild(s)
}
(document,function($){
  //初期化
  $('#mtime-outer').remove();
  $('body').append('<div id="mtime-outer" style="position:fixed;bottom:0;right:0;padding:20px;background-color:#eee;"><p>フィルタ：<select id="filter" style="background-color:#FFF;"><option value="ALL">ALL</option></select></p><p>開始時間：<input type="checkbox" name="chkstime" id="chkstime" /><input type="time" name="starttime" id="starttime" value="09:30" disabled /></p><p>見積時間：<span id="mtime-hour"></span>h (<span id="mtime"></span>m)</p><p style="font-weight:bold;">完了見込：<span id="kantime"></span></p></div>');

  mode=0;
  changeflg=0;

  //日付リスト作成
  function CreateList() {
    mode=0;
    //現在選択中の日付を退避
    fselect=$('#filter').val();
    //タスク取得
    tlist=$('.task_item:not(.checked,.history_item)');
    //日付ヘッダーになっている要素を取得
    dlist=tlist.find('.div_due_date .date');
    if(!dlist.length&&$('.h2_date').length>1){
      //日付ヘッダーが複数ある場合は次の7日間モード
      dlist=$('.h2_date');
      mode=1;
    }
    //日付リストの中身を削除
    $('#filter').children().remove();
    //ALLをリストに追加
    $('#filter').append($('<option></option>').val('ALL').text('ALL'));
    //表示されているタスクの中から日付部分だけ抜き出し、リスト化する
    for(j=0;j<dlist.length;j++){
      //時間部分は削除
      lval=$(dlist[j]).text().replace(/\d\d:\d\d /g,'');
      ltext=lval;
      if(mode==1){
        //日付ではなく、「今日」とか「月曜日」と書かれた部分を取得
        ltext=$(dlist[j]).prev('a').text()
      }
      //まだリストに入れていなければ追加
      if(lval!=''&&$('#filter .'+lval).length==0){
        $('#filter').append($('<option></option>').attr('class',lval).val(lval).text(ltext))
      }
    }
    //選択を戻す
    $('#filter').val(fselect);
    //選択地がなければALLにする
    if(!$('#filter').val()){
      $('#filter').val('ALL')
    }
  };

  //時間計測
  function mjikan(){
    inttime=0;
    i=0;
    j=0;

    //値の変更があればなにもしない
    if(changeflg==1){
      return false;
    }

    //リストの更新
    CreateList();

    //次の7日間で、特定の日付が選択されていた場合
    if(mode==1&&fselect!='ALL'){
      //日付リストの中からさらに絞り込む
      for(k=0;k<dlist.length;k++){
        //選択されていた日付のタスクのリストを作成
        if($(dlist[k]).text()==fselect){
          tlist=$(dlist[k]).closest('div').next('ul').find('.task_item:not(.checked,.history_item)');
        }
      }
      //ALLを選択
      fselect='ALL';
    }
    //タスクのリストから時間を計算
    for(j=0;j<tlist.length;j++){
      if(fselect=='ALL'||$(tlist[j]).find('.div_due_date .date').text().indexOf(fselect)!=-1){

        //タスクについたラベルを取得
        llist=$(tlist[j]).find('.label:not(.label_sep)');
        for(i=0;i<llist.length;i++){
          //「//」がついたラベルを数値に直す
          strlbl=$(llist[i]).text().replace('//','').replace('_','.');
          if($.isNumeric(strlbl)){
            //数値なら加算
            inttime+=parseInt(strlbl,10)
          }
        }
      }
    }
    //分の情報を更新
    $('#mtime').text(inttime);
    //時間の情報を更新
    $('#mtime-hour').text((inttime/60).toFixed(1));
    //終了時刻の計算
    var date=new Date();
    //開始時刻の入力があればそこを基準にする
    if($("#starttime").val()!=""&&$('#chkstime').prop('checked')){
      date=new Date(date.toDateString()+' '+$("#starttime").val());
    }
    //時間の加算
    date.setMinutes(date.getMinutes()+inttime);
    //時間表示
    $('#kantime').text(date.getHours()+':'+('0'+date.getMinutes()).slice(-2));

  };
  //チェックボックス操作
  $('#chkstime').on('change',function(){
    if($('#chkstime').prop('checked')){
      //チェックがついたら変更可能にする
      $('#starttime').removeAttr("disabled");
    }else{
      //チェックがなければ操作不可
      $('#starttime').attr("disabled", "disabled");
    }
    //時間の再計算
    mjikan();
  });
  //時間計算
  mjikan();
  //タイマーセット
  setInterval(mjikan, 1000);
  //フィルターが変更されたら再度時間計算
  $('#filter').change(function(){$('#filter').blur();mjikan()});
  $('#filter').focus(function(){changeflg=1});
  $('#filter').blur(function(){changeflg=0});
})
