
 
$(window).on('load',function(){
	$("#splash").delay(4000).fadeOut('slow');//ローディング画面を1.5秒（1500ms）待機してからフェードアウト
	$("#splash_logo").delay(1200).fadeOut('slow');//ロゴを1.2秒（1200ms）待機してからフェードアウト
  });
 



// ハンバーガーメニュー

$(".openbtn").click(function () {//ボタンがクリックされたら
	$(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
});

$("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
});







// 順番にフェードイン
function delayScrollAnime() {
	var time = 0.5;//遅延時間を増やす秒数の値
	var value = time;
	$('.delayScroll').each(function () {
		var parent = this;					//親要素を取得
		var elemPos = $(this).offset().top;//要素の位置まで来たら
		var scroll = $(window).scrollTop();//スクロール値を取得
		var windowHeight = $(window).height();//画面の高さを取得
		var childs = $(this).children();	//子要素を取得
		
		if (scroll >= elemPos - windowHeight && !$(parent).hasClass("play")) {//指定領域内にスクロールが入ったらまた親要素にクラスplayがなければ
			$(childs).each(function () {
				
				if (!$(this).hasClass("fadeUp")) {//アニメーションのクラス名が指定されているかどうかをチェック
					
					$(parent).addClass("play");	//親要素にクラス名playを追加
					$(this).css("animation-delay", value + "s");//アニメーション遅延のCSS animation-delayを追加し
					$(this).addClass("fadeUp");//アニメーションのクラス名を追加
					value = value + time;//delay時間を増加させる
					
					//全ての処理を終わったらplayを外す
					var index = $(childs).index(this);
					if((childs.length-1) == index){
						$(parent).removeClass("play");
					}
				}
			})
		}else {
			$(childs).removeClass("fadeUp");//アニメーションのクラス名を削除
			value = time;//delay初期値の数値に戻す
		}
	})
}

// 画面をスクロールをしたら動かしたい場合の記述
	$(window).scroll(function (){
		delayScrollAnime();/* アニメーション用の関数を呼ぶ*/
	});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
	$(window).on('load', function(){
		delayScrollAnime();/* アニメーション用の関数を呼ぶ*/
	});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述



const counterContainer = document.getElementById('counter-container');
const counter = document.getElementById('counter');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter();
      observer.unobserve(counterContainer);
    }
  });
});

observer.observe(counterContainer);

function animateCounter() {
  let currentValue = 0;
  const finalValue = 100; // 最終値
  const duration = 2000; // アニメーションの時間（ミリ秒）
  const frameRate = 30; // フレームレート

  const increment = (finalValue / (duration / frameRate));
  const interval = setInterval(() => {
    currentValue += increment;
    counter.textContent = Math.round(currentValue);

    if (currentValue >= finalValue) {
      counter.textContent = finalValue;
      clearInterval(interval);
    }
  }, frameRate);
}







// 普通にフェードイン
//クラス名が「scroll-in」の要素を取得
const objects = document.querySelectorAll('.scroll-in');

//スクロール感知で実行
const cb = function(entries, observer) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('displayed');//スクロール感知で「displayed」のクラス名を付与
            observer.unobserve(entry.target); //監視の終了
        }
    });
}
// オプション
const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0
}

// IntersectionObserverインスタンス化
const io = new IntersectionObserver(cb, options);

// 監視を開始
objects.forEach(object => {
    io.observe(object);
});







//100％アニメーション
//box1の指定
$('#box1').on('inview', function(event, isInView) {
  if (isInView) {
    //要素が見えたときに実行する処理
    $("#box1 .count-up").each(function(){
      $(this).prop('Counter',0).animate({//0からカウントアップ
            Counter: $(this).text()
        }, {
        // スピードやアニメーションの設定
            duration: 2000,//数字が大きいほど変化のスピードが遅くなる。2000=2秒
            easing: 'swing',//動きの種類。他にもlinearなど設定可能
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
  }
}); 













// フッターの要素に入ったらヘッダー消える
jQuery(function() {
  var footer = $('.footer').innerHeight();

  function handleScroll() {
    var point = window.pageYOffset;
    var docHeight = $(document).height();
    var dispHeight = $(window).height();

    if ($(window).width() > 1000) {
      if (point > docHeight - dispHeight - footer) {
        $('#header').addClass('is-hidden');
      } else {
        $('#header').removeClass('is-hidden');
      }
    } else {
      // 425px以下の場合の処理をここに追加する（何もしない、あるいは必要な処理を追加する）
    }
  }

  $(window).on('scroll', handleScroll);
  $(window).on('resize', handleScroll); // ウィンドウのリサイズ時にも処理を実行する
});




// マウスストーカー関連の要素（任意で変更してください）
const mouseStalker = "#stkr";           // マウスストーカーになる要素を指定
const mouseTarget = ".stkr-target";     // リンクなどアクションを付けたい要素を指定
const mouseStalkerArea = window;        // マウスストーカーが機能する要素を指定

// 処理で使う変数たち
const stkrSize = parseInt($(mouseStalker).css("width").replace(/px/, ""));
const stkrPosX = parseInt($(mouseStalker).css("left").replace(/px/, ""));
const stkrPosY = parseInt($(mouseStalker).css("top").replace(/px/, ""));
const cssPosAjust = stkrPosX + (stkrSize / 2);
let scale = 1;

// 追従用の処理
$(mouseStalkerArea).hover(function(){
  $(mouseStalkerArea).mousemove(function(e){
    let x = e.clientX - cssPosAjust;
    let y = e.clientY - cssPosAjust;
    $(mouseStalker).css({
      "transform": "translate(" + x + "px," + y + "px) scale(" + scale + ")",
    });
  });
});

// リンクホバーの処理
$(mouseTarget).hover(function(e){
  scale = 5;
  let x = e.clientX - cssPosAjust;
  let y = e.clientY - cssPosAjust;
  $(mouseStalker).css({
    "transform": "translate(" + x + "px," + y + "px) scale(" + scale + ")",
  });
}, function(){
  scale = 1;
});





  // タブ
  $('nav a').click(function(){
    var tabId = $(this).attr('data-tab');
    
    $('nav a').removeClass('active');
    $('.Tabcondent').removeClass('active');
    
    $(this).addClass('active');
    $('#'+tabId).addClass('active');
  });








// プログレスバー
(function progressBar(){
  const bar = document.querySelector('.progress-bar');
  window.addEventListener('scroll', function updateBar(){
    const windowScroll = window.pageYOffset;
    const docHeight = document.body.clientHeight;
    const windowHeight = window.innerHeight;
   
    const scrollUnit = (windowScroll / (docHeight - windowHeight) * 100);
    bar.style.height = scrollUnit + "%";
  })
}());





// ハンバーガーメニューホバーしたら背景変更
var project = $('.project');
var pLink = project.find('.project__link');
var pBg = project.find('.project__bg-item');

var changeBg = function() {
  var thisProject = $(this);
  var thisProjectIndex = thisProject.parent().index();
  var thisProjectBg = pBg.eq(thisProjectIndex);
  
  // hide all backgrounds and fade out project names
  pBg.removeClass('project__bg-item--active');
  pLink.css('opacity', '0.4');
  
  // reveal the project bg you hovered over and increase opacity for that name
  thisProject.css('opacity', '1');
  thisProjectBg.addClass('project__bg-item--active');
};

var showFirst = function() {
  // when the page loads reveal the first project
  pLink.css('opacity', '0.4');
  pLink.parent().first().children().css('opacity', '1');
  pBg.first().addClass('project__bg-item--active');
}

var init = function() {
  $(document).on('ready', showFirst);
  pLink.on('mouseenter', changeBg);
};

init();

















$('#page-link a[href*="#"]').click(function () {//全てのページ内リンクに適用させたい場合はa[href*="#"]のみでもOK
	var elmHash = $(this).attr('href'); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
	var pos = $(elmHash).offset().top-100;//idの上部の距離からHeaderの高さを引いた値を取得
	$('body,html').animate({scrollTop: pos}, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
	return false;
});







