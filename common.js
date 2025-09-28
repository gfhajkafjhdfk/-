
/**
 * common.js
 *
 * @version 1.1.0
 * @namespace
 * @constructor
 * @module
 * @execution
 * @requires
 * - jquery.js
 * - jquery.cookie.js
 * - jquery.colorbox.js
 * - slick.js
 */


/**
 * @namespace COMMON
 */
var COMMON = COMMON || {};


/**
 * @constructor Util
 */
COMMON.Util = function(){
  'use strict';
  this.$win = $(window);
  this.$doc = $(document);
  this.ua = navigator.userAgent.toLowerCase();
  this.ver = window.navigator.appVersion.toLowerCase();
  this.url = location.href;
  this.path = location.pathname.replace('index.html', '');
  this.dir = this.path.split('/');
  this.view = 1280;
  this.breakPoint1 = 767;
  this.state = {
    current: 'is-current',
    open: 'is-open',
    active: 'is-active',
    fixed: 'is-fixed',
    disabled: 'is-disabled',
    selected: 'is-selected'
  };
  this.factor = {
    equalHeight: '.js-equalHeight'
  };
};

COMMON.Util.prototype = {
  /**
   * @method isRangeSP
   * @return {Boolean}
   */
  isRangeSP: function(){
    'use strict';
    var clientW = document.documentElement.clientWidth,
        winW = window.innerWidth ? window.innerWidth : (this.$win.width() ? this.$win.width() : clientW);
    return (winW <= this.breakPoint1) ? true : false;
  },
  /**
   * @method isRangePC
   * @return {Boolean}
   */
  isRangePC: function(){
    'use strict';
    var clientW = document.documentElement.clientWidth,
        winW = window.innerWidth ? window.innerWidth : (this.$win.width() ? this.$win.width() : clientW);
    return (this.breakPoint1 < winW) ? true : false;
  },
  /**
   * @method deviceChecker
   * @return {String}
   */
  deviceChecker: function(){
    'use strict';
    if(this.ua.indexOf('iphone') !== -1) { return 'iphone'; }
    else if(this.ua.indexOf('ipod') !== -1) { return 'ipod'; }
    else if(this.ua.indexOf('ipad') !== -1) { return 'ipad'; }
    else if(this.ua.indexOf('android') !== -1 && this.ua.indexOf('mobile') !== -1) { return 'android mobile'; }
    else if(this.ua.indexOf('android') !== -1 && this.ua.indexOf('mobile') === -1) { return 'android tablet'; }
    else if(this.ua.indexOf('windows phone') !== -1) { return 'windows phone'; }
    else { return 'desktop'; }
  },
  /**
   * @method isMobile
   * @return {Boolean}
   */
  isMobile: function(){
    'use strict';
    return (this.deviceChecker() === 'iphone' || this.deviceChecker() === 'ipod' || this.deviceChecker() === 'android mobile' || this.deviceChecker() === 'windows phone') ? true : false;
  },
  /**
   * @method isTablet
   * @return {Boolean}
   */
  isTablet: function(){
    'use strict';
    return (this.deviceChecker() === 'ipad' || this.deviceChecker() === 'android tablet') ? true : false;
  },
  /**
   * @method isDesktop
   * @return {Boolean}
   */
  isDesktop: function(){
    'use strict';
    return (!this.isMobile() && !this.isTablet()) ? true : false;
  },
  /*
   * @method isiPhone
   * @return {Boolean}
   */
  isiPhone: function(){
    'use strict';
    var UA = {
      iPhone: this.ua.indexOf('iphone') !== -1,
      iPod: this.ua.indexOf('ipod') !== -1,
    };
    return (UA.iPhone || UA.iPod) ? true : false;
  },
  /*
   * @method isAndroid
   * @return {Boolean}
   */
  isAndroid: function(){
    'use strict';
    return (this.ua.indexOf('android') !== -1) ? true : false;
  },
  /**
   * @method isBrowser
   * @param {String}
   * @return {Boolean}
   */
  isBrowser: function(_browser){
    'use strict';
    var browser = ['chrome', 'safari', 'firefox', 'edge', 'ie11'],
        browser_old = ['ie8', 'ie9', 'ie10'];
    switch(_browser){
      case browser[0]: return(this.ua.indexOf('chrome')  !== -1 && this.ua.indexOf('edge') === -1) ? true : false;
      case browser[1]: return(this.ua.indexOf('safari')  !== -1 && this.ua.indexOf('chrome') === -1) ? true : false;
      case browser[2]: return(this.ua.indexOf('firefox') !== -1) ? true : false;
      case browser[3]: return(this.ua.indexOf('edge') !== -1) ? true : false;
      case browser[4]: return((this.ua.indexOf('rv 11') !== -1 || this.ua.indexOf('rv:11') !== -1) && (this.ua.indexOf('trident') !== -1)) ? true : false;
      case browser_old[0]: return (this.ver.indexOf('msie 8') !== -1) ? true : false;
      case browser_old[1]: return (this.ver.indexOf('msie 9') !== -1) ? true : false;
      case browser_old[2]: return (this.ver.indexOf('msie 10') !== -1) ? true : false;
      default: return false;
    }
  },
  /**
   * @method isFontSizeWatch
   * @param {function}
   * @return {Boolean}
   */
  isFontSizeWatch: function(callback){
    'use strict';
    var $elm,
        $body = $('body'),
        watchName = 'js-fontSizeWatch',
        currentH = 0,
        interval = 500,
        HTML_FS_WATCH = $('<div class="' + watchName + '">&nbsp;</div>'),
        CSS_FS_WATCH = { position: 'absolute', top: '0', display: 'block', padding: '0', visibility: 'hidden' };
    // 監視用HTMLを生成する
    if(!$('.' + watchName).length){
      HTML_FS_WATCH.css(CSS_FS_WATCH).appendTo($body);
    }
    $elm = $('.' + watchName);
    // 要素の高さを取得
    var getHeight = function($elm){ return $elm.height(); };
    // 要素の高さを比較して、異なればcallbackを実行
    var watching = function(){
      var h = getHeight($elm);
      if(h === currentH){
        return false;
      } else {
        currentH = h;
        callback();
      }
    };
    setInterval(watching, interval);
  },
  /**
   * @method isWindowSizeWatch
   * @param {function}
   * @return {Boolean}
   */
  isWindowSizeWatch: function(callback){
    'use strict';
    var resize = false,
        interval = 500;
    this.$win.on('resize', function(){
      // リサイズされている間は何もしない
      if(resize !== false){ clearTimeout(resize); }
      resize = setTimeout(function(){
        callback();
      }, interval);
    });
  }
};


/**
 * @module
 */
COMMON.module = function(){
  'use strict';
  var u = new COMMON.Util();
  return {
    /**
     * @method initialize
     * - 初期化
     */
    initialize: function(){
      this.respondBrowser();
      this.smartView();
      this.smoothScroll();
      this.pagetopControl();
      this.accordion();
      this.accordion02();
      this.accordion03();
      this.tabs();
      //this.equalHeight(true, true);  // onLoad
      this.swapImg();
      this.fitWidth();
      this.sideNavControl();
      this.langControl();
      this.popup();
      this.rollover();
      this.rowEdgeControl();
      this.fontSizeControl();
      //this.modalControl();  // onLoad
      this.sliderControl();
      this.headerControl();
      this.footerControl();
      this.reloadControl();
      this.trainInformation();
      this.moreContents();
      this.moreContents02();
      this.mapSlider();
      this.newsInformation();
      this.localnavControl();
      this.stationRecommendControl();
      this.agreeCheckControl();
    },
    /**
     * @method respondBrowser
     * - ブラウザ対応
     */
    respondBrowser: function(){
      // vars
      var $body = $('body'),
          attrName = 'data-browser';
      // setting：属性設定
      if(u.isBrowser('chrome')){ $body.attr(attrName, 'chrome'); }
      else if(u.isBrowser('safari')){ $body.attr(attrName, 'safari'); }
      else if(u.isBrowser('firefox')){ $body.attr(attrName, 'firefox'); }
      else if(u.isBrowser('edge')){ $body.attr(attrName, 'edge'); }
      else if(u.isBrowser('ie11')){ $body.attr(attrName, 'ie11'); }
      // UA判別による要素の出し分け
      if(u.isiPhone()){
        $("body").addClass("ua-iPhone");
        $(".ua-iPhoneOnly").show();
        $(".ua-AndroidOnly").remove();
      }
      if(u.isAndroid()){
        $("body").addClass("ua-Android");
        $(".ua-AndroidOnly").show();
        $(".ua-iPhoneOnly").remove();
      }
    },
    /**
     * @method smartView
     * - viewport設定
     */
    smartView: function(){
      // vars
      var viewPoint = u.view;
      // setting：デバイスごとにviewport設定
      if(u.isTablet()){
        $('meta[name="viewport"]').attr('content', 'width=' + viewPoint + 'px');
      } else if(u.isMobile()){
        $('meta[name="viewport"]').attr('content', 'width=device-width, initial-scale=1, minimum-scale=1.0, user-scalable=yes, shrink-to-fit=no');
      }
    },
    /**
     * @method smoothScroll
     * - スムーススクロール
     */
    smoothScroll: function(config){
      // options
      var c = $.extend({
        escapeElement: '.js-esc-smoothScroll',
        topmostElement: '#header',  // ページトップリンクに設定する要素（hrefの値）
        scrollSpeed: 300,
        easingType: 'swing'
      }, config);
      // vars
      var $elm = $('a[href^="#"], area[href^="#"]').not('a[href="#"], area[href="#"], a[href^="#tab"], a[href^="#modal"], ' + c.escapeElement),
          topmost = c.topmostElement,
          speed = c.scrollSpeed,
          easing = c.easingType,
          fixH;
      // control：ページ内アンカー移動制御
      $elm.on('click', function(){
        var self = $(this),
            thisHref = self.attr('href'),
            target = $(thisHref),
            position;
        // 遷移無効
        if(target.offset() === undefined){
          return false;
        }
        if(!u.isRangeSP()){
          fixH = 0;
        } else {
          fixH = $("#header").outerHeight();
        }
        // アンカー位置設定
        position = target.offset().top;
        if(thisHref === topmost){
          position = 0;
        }
        // スムース移動
        $('html, body').animate({
          scrollTop: position - fixH
        }, speed, easing);
        // 無効化
        return false;
      });
    },
    /**
     * @method pagetopControl
     * - ページトップ制御
     */
    pagetopControl: function(config){
      // options
      var c = $.extend({
        factorElement: '.js-pagetop'
      }, config);
      // vars
      var $pagetop = $(c.factorElement),
          dispY = 100,
          fadeSpeed = 300;
      // exit
      if($pagetop.length === 0){ return false; }
      // setting
      $pagetop.hide();
      // control
      u.$win.on('scroll', function(){
        var $this = $(this),
            scrollY = $this.scrollTop();
        // ページトップ表示制御
        if(scrollY > dispY){
          $pagetop.fadeIn(fadeSpeed);
        } else {
          $pagetop.fadeOut(fadeSpeed);
        }
      });
    },
    /**
     * @method accordion
     * - アコーディオン
     */
    accordion: function(config){
      // options
      var c = $.extend({
        factorElement: '.js-accordion',
        triggerElement: '.js-accordion_trigger',
        panelElement: '.js-accordion_detail',
        panelDisplayType: 'allHide',  // 初期表示設定：「allHide」or「allShow」
        slideSpeed: 200
      }, config);
      // vars
      var $elm = $(c.factorElement),
          accWrap = c.factorElement,
          accTrigger = c.triggerElement,
          accPanel = c.panelElement,
          display = c.panelDisplayType,
          activeName = u.state.active,
          speed = c.slideSpeed;
      // exit
      if($elm.length === 0){ return false; }
      // setting：表示設定
      $elm.each(function(){
        var wrap = $(this),
            trigger = wrap.find(accTrigger);
        switch(display){
          // 全非表示の場合
          case 'allHide':
            trigger.removeClass(activeName);
            wrap.find(accPanel).hide();
            break;
          // 全表示の場合
          case 'allShow':
            trigger.addClass(activeName);
            break;
          default:
            break;
        }
      });
      // control
      $(accTrigger).on('click', function(){
        var trigger = $(this),
            wrap = trigger.parents(accWrap);
        if(wrap.length){
          if(trigger.hasClass(activeName)){
            trigger.removeClass(activeName);
            wrap.find(accPanel).stop(true, true).slideUp(speed);
          } else {
            trigger.addClass(activeName);
            wrap.find(accPanel).stop(true, true).slideDown(speed);
            // 再実行
            if(wrap.find(accPanel).find(u.factor.equalHeight).length){ COMMON.module.equalHeight(); }
          }
        }
      });
      // control 02
      var $ticket = ".ticketContents-acc";
      if($($ticket).length === 0){ return false; }
      
      var ticket_last = $($ticket+":last");
      ticket_last.find(accTrigger).addClass(activeName);
      ticket_last.find(accPanel).stop(true, true).slideDown(speed);
      // 再実行
      if(ticket_last.find(accPanel).find(u.factor.equalHeight).length){ COMMON.module.equalHeight(); }
    },
    /**
     * @method accordion02
     * - アコーディオン02
     */
    accordion02: function(config){
      // options
      var c = $.extend({
        factorElement: '.sp-js-smp-accordion',
        triggerElement: '.sp-js-smp-accordion_trigger',
        panelElement: '.sp-js-smp-accordion_detail',
        slideSpeed: 200
      }, config);
      // vars
      var $elm = $(c.factorElement),
          accWrap = c.factorElement,
          accTrigger = c.triggerElement,
          accPanel = c.panelElement,
          activeName = u.state.active,
          speed = c.slideSpeed;
      // exit
      if($elm.length === 0){ return false; }
      
      // control
      if(u.isRangeSP()){
        $(accTrigger).on('click', function(){
          var trigger = $(this),
              wrap = trigger.parents(accWrap);
          if(wrap.length){
            if(trigger.hasClass(activeName)){
              trigger.removeClass(activeName);
              wrap.find(accPanel).stop(true, true).slideUp(speed);
            } else {
              trigger.addClass(activeName);
              wrap.find(accPanel).stop(true, true).slideDown(speed);
              // 再実行
              if(wrap.find(accPanel).find(u.factor.equalHeight).length){ COMMON.module.equalHeight(); }
            }
          }
        });
      }
    },
    /**
     * @method accordion03
     * - アコーディオン03
     */
    accordion03: function(config){
      // options
      var c = $.extend({
        factorElement: '.sp-js-smp-accordion02',
        triggerElement: '.sp-js-smp-accordion_trigger02',
        panelElement: '.sp-js-smp-accordion_detail02',
        slideSpeed: 200
      }, config);
      // vars
      var $elm = $(c.factorElement),
          accWrap = c.factorElement,
          accTrigger = c.triggerElement,
          accPanel = c.panelElement,
          activeName = u.state.active,
          speed = c.slideSpeed;
      // exit
      if($elm.length === 0){ return false; }
      
      // control
      if(u.isRangeSP()){
        $(accTrigger).on('click', function(){
          var trigger = $(this),
              wrap = trigger.parents(accWrap);
          if(wrap.length){
            if(trigger.hasClass(activeName)){
              trigger.removeClass(activeName);
              wrap.find(accPanel).stop(true, true).slideUp(speed);
            } else {
              trigger.addClass(activeName);
              wrap.find(accPanel).stop(true, true).slideDown(speed);
              // 再実行
              if(wrap.find(accPanel).find(u.factor.equalHeight).length){ COMMON.module.equalHeight(); }
            }
          }
        });
      }
    },
    /**
     * @method tabs
     * - タブ切り替え
     */
    tabs: function(config){
      // options
      var c = $.extend({
        factorElement: '.js-tabs',
        naviElement: '.js-tabs_navi',
        triggerElement: '.js-tabs_trigger',
        panelElement: '.js-tabs_detail',
        spAccordionElement: '.js-sp-acc_tabs',
        firstDisplayTab: ''  // 初期表示タブ：タブのid「#xxxx」を指定（※何も指定しなければ一番最初のタブを表示）
      }, config);
      // vars
      var $elm = $(c.factorElement),
          $sp_acc_tabs = $(c.spAccordionElement),
          tabWrap = c.factorElement,
          tabNavi = c.naviElement,
          tabTrigger = c.triggerElement,
          tabPanel = c.panelElement,
          currentName = u.state.current;
      // exit
      if($elm.length === 0){ return false; }
      if(u.isRangeSP() && $elm.hasClass("sp-js-smp-accordion")){ return false; }
      // setting：表示設定
      $elm.each(function(){
        var wrap = $(this),
            navi = wrap.find(tabNavi),
            panel = wrap.find(tabPanel),
            firstPanel = c.firstDisplayTab,
            hash = location.hash;
        if(hash) {
          // URLに初期表示タブ指定がある場合
          navi.find('a[href="' + hash + '"]').parent().addClass(currentName);
          panel.show().not(hash).hide();
        }
        if(firstPanel !== ''){
          // JS側で初期表示タブに指定がある場合
        } else if(navi.find('li').hasClass(currentName)){
          // HTML側で現在地の指定がある場合
          firstPanel = $('.' + currentName, navi).find(tabTrigger).attr('href');
        } else {
          firstPanel = navi.find('li:first').find(tabTrigger).attr('href');
        }
        navi.find('a[href="' + firstPanel + '"]').parent().addClass(currentName);
        panel.show().not(firstPanel).hide();
      });
      
      // control
      $(tabTrigger).on('click', function(){
        var trigger = $(this),
            wrap = trigger.closest(tabWrap),
            navi = wrap.find(tabNavi),
            panel = wrap.find(tabPanel),
            targetPanel = trigger.attr('href');
        if(trigger.parent().hasClass(currentName)){
          return false;
        } else {
          navi.find('li').removeClass(currentName);
          navi.find('a[href="' + targetPanel + '"]').parent().addClass(currentName);
          panel.show().not(targetPanel).hide();
          // 再実行
          if(wrap.find(targetPanel).find(u.factor.equalHeight).length){ COMMON.module.equalHeight(); }
          return false;
        }
      });
      // control 02
      if(u.isRangeSP()){
        var sp_tabTrigger = $(".sp-tabs_navi");
        if(sp_tabTrigger.length){
          $sp_acc_tabs.find(tabPanel).hide();
        }
        $sp_acc_tabs.find(sp_tabTrigger).on('click', function(){
          var trigger = $(this),
              wrap = trigger.parents($sp_acc_tabs),
              speed = 300;
          if(wrap.length){
            if(trigger.hasClass(currentName)){
              trigger.removeClass(currentName);
              trigger.next(tabPanel).stop(true, true).slideUp(speed);
            } else {
              trigger.addClass(currentName);
              trigger.next(tabPanel).stop(true, true).slideDown(speed);
            }
          }
        });
      }
      
      // control 03
      $(".tabChange-link").on('click', function(){
        var trigger = $(this),
            targetPanel = trigger.attr('href'),
            tabNav = $(c.naviElement).find('a[href="' + targetPanel + '"]'),
            navTop = $(c.naviElement).offset().top;
        $('html,body').animate({
          scrollTop: navTop
        }, 'slow','swing');
        tabNav.trigger('click');
        return false;
      });
      // control 04
      var $sp_acc_tabs_haneda = $(".js-sp-acc_tabs_haneda");
      if(u.isRangeSP()){
        var sp_tabTrigger_haneda = $(".sp-tabs_navi");
        if(sp_tabTrigger_haneda.length){
          $sp_acc_tabs_haneda.find(tabPanel).hide();
          $(".sp-tabs_navi.is-current").next().show();
        }
        $sp_acc_tabs_haneda.find(sp_tabTrigger_haneda).on('click', function(){
          var trigger = $(this),
              wrap = trigger.parents($sp_acc_tabs_haneda),
              speed = 300;
          if(wrap.length){
            if(trigger.hasClass(currentName)){
              trigger.removeClass(currentName);
              trigger.next(tabPanel).stop(true, true).slideUp(speed);
            } else {
              $sp_acc_tabs_haneda.find(sp_tabTrigger_haneda).removeClass(currentName);
              $sp_acc_tabs_haneda.find(tabPanel).stop(true, true).slideUp(speed);
              trigger.addClass(currentName);
              trigger.next(tabPanel).stop(true, true).slideDown(speed);
            }
          }
        });
      }
    },
    /**
     * @method equalHeight
     * - 高さ揃え
     * @param {Boolean} 文字可変に対応するかどうか
     * @param {Boolean} リサイズに対応するかどうか
     */
    equalHeight: function(fsWatch, wsWatch, config){
      // options
      var c = $.extend({
        factorElement: u.factor.equalHeight,
        spEscapeElement: '.js-esc-sp-equalHeight, [data-row-sp="1"]',
        alignChildPrefix: 'js-equalHeight_'
      }, config);
      // vars
      var $elm = $(c.factorElement),
          spEscElm = c.spEscapeElement,
          childBaseName = c.alignChildPrefix,
          $children,
          $spChildren,
          CSS_OBJ = { height: '' };
      // exit
      if($elm.length === 0){ return false; }
      // setting
      fsWatch = fsWatch || false;
      wsWatch = wsWatch || true;
      // function：childBaseNameのグループ化
      var grouping = function(target){
        var $groupedChildren = target.find('*[class*=' + childBaseName + ']'),
            classNames = {},
            groups = [];
        $groupedChildren.each(function(){
          var splitClass = $(this).attr('class').split(' '),
              splitClassNum = splitClass.length,
              newClassName;
          for(var i = 0; i < splitClassNum; i++){
            newClassName = splitClass[i].match(RegExp(childBaseName + '[a-z0-9,_,-]*', 'i'));
            if(!newClassName){
              continue;
            } else {
              newClassName.toString();
              classNames[newClassName] = newClassName;
            }
          }
        });
        // childBaseNameの格納
        for(var c in classNames){
          if(u.isRangeSP()){
            groups.push(target.not(spEscElm).find('.' + c));
          } else {
            groups.push(target.find('.' + c));
          }
        }
        return groups;
      };
      // function：各要素の高さを揃える
      var alignHeight = function(elm){
        var maxH = 0;
        elm.css(CSS_OBJ);
        elm.each(function(){
          if($(this).outerHeight() > maxH){
            maxH = $(this).outerHeight();
          }
        });
        return elm.outerHeight(maxH);
      };
      // function：初期化処理
      var init = function(target){
        var groups = grouping(target);
        $children = target.children();
        $spChildren = target.not(spEscElm).children();
        var eqAct = function(eqObj){
          var h = [],
              child = [],
              top = 0;
          $.each(eqObj, function(){
            // 非表示要素に適用させない場合.not(':hidden')を付与
            var $group = $(this).not(':hidden');
            $group.each(function(i){
              $(this).css(CSS_OBJ);
              h[i] = $(this).outerHeight();
              if((top !== Math.round($(this).offset().top)) && (top !== Math.round($(this).offset().top)+1) && (top !== Math.round($(this).offset().top)-1)){
                alignHeight($(child));
                child = [];
                top = Math.round($(this).offset().top);
              }
              child.push(this);
            });
          });
          if(child.length > 1){ alignHeight($(child)); }
        };
        // childBaseName要素の高さを揃える
        eqAct(groups);
        // 子要素の高さを揃える
        if(u.isRangeSP()){
          eqAct($spChildren);
          $(spEscElm).children().css(CSS_OBJ);
          $(spEscElm).find('*[class*=' + childBaseName + ']').css(CSS_OBJ);
        } else {
          eqAct($children);
        }
      };
      // 文字可変・リサイズへの対応可否
      $elm.each(function(){
        var self = $(this);
        if(fsWatch){ u.isFontSizeWatch(function(){ init(self); }); } else { init(self); }
        if(wsWatch){ u.isWindowSizeWatch(function(){ init(self); }); } else { init(self); }
      });
    },
    /**
     * @method swapImg
     * - ウィンドウ幅で画像切り替え
     */
    swapImg: function(config){
      // options
      var c = $.extend({
        factorElement: '.js-swapImg',
        retinaSuffix: '-r2x'
      }, config);
      // vars
      var $elm = $(c.factorElement),
          suffix = c.retinaSuffix;
      // exit
      if($elm.length === 0){ return false; }
      // function
      var swapping = function(img){
        if(u.isRangeSP()){
          if(img.attr('src').indexOf(suffix) === -1){
            img.attr('src', img.attr('src').replace(/^(.+)(\.[a-z]+)$/, '$1' + suffix + '$2'));
          }
        } else {
          if(img.attr('src').indexOf(suffix) !== -1){
            img.attr('src', img.attr('src').replace(new RegExp('^(.+)' + suffix + '(\.[a-z]+)$' ), '$1$2'));
          }
        }
      };
      // control
      $elm.each(function(){
        var self = $(this);
        swapping(self);
        // resize
        u.isWindowSizeWatch(function(){
          swapping(self);
        });
      });
    },
    /**
     * @method fitWidth
     * - キャプション幅揃え
     */
    fitWidth: function(config){
      // options
      var c = $.extend({
        factorElement: '.js-fitWidth',
        spEscapeElement: '.js-esc-sp-fitWidth',
        isResize: true
      }, config);
      // vars
      var $elm = $(c.factorElement),
          spEscName = c.spEscapeElement.split('.')[1],
          CSS_OBJ = { width: '' };
      // exit
      if($elm.length === 0){ return false; }
      // function
      var fitting = function(target){
        var imageObj = new Image(),
            targetImg = target.find('img'),
            cssW,
            naturalW,
            setW,
            setSrc = targetImg.attr('src');
        // 画像読み込み完了後、コールバック
        imageObj.onload = function(){
          cssW = parseInt(targetImg.css('width'));
          naturalW = imageObj.width;
          setW = (cssW !== 0 && cssW < naturalW) ? cssW : naturalW;
          if(u.isRangeSP() && target.hasClass(spEscName)){
            target.css(CSS_OBJ);
            return;
          } else {
            target.css(CSS_OBJ);
          }
          target.css({
            'width': setW,
            'maxWidth': '100%'
          });
        };
        // 画像読み込み開始
        imageObj.src = setSrc;
      };
      // control
      $elm.each(function(){
        var self = $(this);
        fitting(self);
        // resize
        if(c.isResize){
          u.isWindowSizeWatch(function(){
            // 初期化
            self.css(CSS_OBJ);
            fitting(self);
          });
        }
      });
    },
    /**
     * @method sideNavControl
     * - サイドナビ制御
     */
    sideNavControl: function(config){
      // options
      var c = $.extend({
        factorElement: '.js-sideNav',
        navStage1Element: '.js-sideNav_stage1',
        navStage2Element: '.js-sideNav_stage2',
        navStage3Element: '.js-sideNav_stage3'
      }, config);
      // vars
      var $elm = $(c.factorElement),
          $stage1 = $elm.find(c.navStage1Element),
          $stage2 = $elm.find(c.navStage2Element),
          $stage3 = $elm.find(c.navStage3Element),
          pagePath = u.path,
          openName = u.state.open,
          currentName = u.state.current,
          matchFlag = false;
      // exit
      if($elm.length === 0){ return false; }
      // setting
      $stage2.hide();
      $stage3.hide();
      // funtion：第3ステージメニューON・開閉制御
      var stage3Matching = function(){
        $('> li', $stage3).each(function(){
          var $this3 = $(this),
              thisHref = $this3.find('> a').attr('href').split('?')[0].replace('index.html', '');
          if(thisHref === pagePath){
            $this3.addClass(currentName);
            $this3.parent().show();
            $this3.parent().parent().addClass(openName);
            $this3.parent().parent().parent().show();
            $this3.parent().parent().parent().parent().addClass(openName);
            matchFlag = true;
          }
        });
      };
      // funtion：第2ステージメニューON・開閉制御
      var stage2Matching = function(){
        $('> li', $stage2).each(function(){
          var $this2 = $(this),
              thisHref = $this2.find('> a').attr('href').split('?')[0].replace('index.html', '');
          if(thisHref === pagePath){
            $this2.addClass(currentName);
            $this2.find('> ul').show();
            $this2.parent().show();
            $this2.parent().parent().addClass(openName);
            matchFlag = true;
          }
        });
      };
      // funtion：第1ステージメニューON・開閉制御
      var stage1Matching = function(){
        $('> li', $stage1).each(function(){
          var $this1 = $(this),
              thisHref = $this1.find('> a').attr('href').split('?')[0].replace('index.html', '');
          if(thisHref === pagePath){
            $this1.addClass(currentName);
            $this1.find('> ul').show();
            matchFlag = true;
          }
        });
      };
      // control
      if($stage3.length){
        stage3Matching();
        if(!matchFlag){
          stage2Matching();
          if(!matchFlag){
            stage1Matching();
          }
        }
      } else if($stage2.length){
        stage2Matching();
        if(!matchFlag){
          stage1Matching();
        }
      } else if($stage1.length){
        stage1Matching();
      }
    },
    /**
     * @method langControl
     * - 言語間のリンク遷移制御
     */
    langControl: function(config){
      // options
      var c = $.extend({
        factorElement: '.js-lang',
        jaTriggerElement: '.js-lang_ja',
        enTriggerElement: '.js-lang_en',
        zhTriggerElement: '.js-lang_zh',
        jaDirectoryName: '',
        enDirectoryName: 'english',
        zhDirectoryName: 'chinese',
        baseDirectory: '/',  // 言語ディレクトリより上にある共通のディレクトリ（例：/xxxx/xxxxxxx/en/の場合、「/xxxx/xxxxxxx/」を指定。上のディレクトリが存在しない場合は「/」を指定。）
        isSameHierarchy: false  //  日本語のディレクトリが他言語のディレクトリと同階層にあるか
      }, config);
      // vars
      var $elm = $(c.factorElement),
          $jaTrigger = $elm.find(c.jaTriggerElement),
          $enTrigger = $elm.find(c.enTriggerElement),
          $zhTrigger = $elm.find(c.zhTriggerElement),
          jaDir = (c.jaDirectoryName === '') ? '/' : '/' + c.jaDirectoryName + '/',
          enDir = '/' + c.enDirectoryName + '/',
          zhDir = '/' + c.zhDirectoryName + '/',
          baseDir = c.baseDirectory,
          pagePath = u.path,
          targetPath,
          lang,
          currentName = u.state.current,
          JUMP_URL = {
            ja_home: baseDir.slice(0,-1) + jaDir,
            en_home: baseDir.slice(0,-1) + enDir,
            zh_home: baseDir.slice(0,-1) + zhDir
          };
      // exit
      if($elm.length === 0){ return false; }
      // setting：言語判定
      if(pagePath.indexOf(enDir) !== -1){ lang = 'en'; }
      else if(pagePath.indexOf(zhDir) !== -1){ lang = 'zh'; }
      else { lang = 'ja'; }
      // setting：ON設定
      if(lang === 'ja'){ $jaTrigger.addClass(currentName); }
      else if(lang === 'en'){ $enTrigger.addClass(currentName); }
      else if(lang === 'zh'){ $zhTrigger.addClass(currentName); }
      // function：Ajax読み込み
      var getAjax = function(targetPath){
        return $.ajax({
          type: 'GET',
          url: targetPath,
          dataType: 'html'
        });
      };
      // control：「日本語」ボタン制御
      $jaTrigger.on('click', function(){
        if(lang === 'ja'){ return false; }
        if(baseDir === '/'){
          targetPath = pagePath.replace(new RegExp(enDir + '|' + zhDir, 'g'), jaDir);
        } else {
          targetPath = baseDir.slice(0,-1) + ('/' + pagePath.split(baseDir)[1]).replace(new RegExp(enDir + '|' + zhDir, 'g'), jaDir);
        }
        $.when(getAjax(targetPath))
        .done(function(){ window.location = targetPath; })
        .fail(function(){ window.location = JUMP_URL.ja_home; });
      });
      // control：「English」ボタン制御
      $enTrigger.on('click', function(){
        if(lang === 'en'){ return false; }
        if(c.isSameHierarchy){
          targetPath = pagePath.replace(new RegExp(jaDir + '|' + zhDir, 'g'), enDir);
        } else {
          if(baseDir === '/'){
            targetPath = enDir.slice(0,-1) + pagePath.replace(new RegExp(zhDir.slice(0,-1), 'g'), '');
          } else {
            targetPath = baseDir.slice(0,-1) + enDir.slice(0,-1) + ('/' + pagePath.split(baseDir)[1]).replace(new RegExp(zhDir.slice(0,-1), 'g'), '');
          }
        }
        $.when(getAjax(targetPath))
        .done(function(){ window.location = targetPath; })
        .fail(function(){ window.location = JUMP_URL.en_home; });
      });
      // control：「中文」ボタン制御
      $zhTrigger.on('click', function(){
        if(lang === 'zh'){ return false; }
        if(c.isSameHierarchy){
          targetPath = pagePath.replace(new RegExp(jaDir + '|' + enDir, 'g'), zhDir);
        } else {
          if(baseDir === '/'){
            targetPath = zhDir.slice(0,-1) + pagePath.replace(new RegExp(enDir.slice(0,-1), 'g'), '');
          } else {
            targetPath = baseDir.slice(0,-1) + zhDir.slice(0,-1) + ('/' + pagePath.split(baseDir)[1]).replace(new RegExp(enDir.slice(0,-1), 'g'), '');
          }
        }
        $.when(getAjax(targetPath))
        .done(function(){ window.location = targetPath; })
        .fail(function(){ window.location = JUMP_URL.zh_home; });
      });
    },
    /**
     * @method popup
     * - ポップアップ
     */
    popup: function(config){
      // options
      var c = $.extend({
        factorElement: '.js-popup',
        popupWidth: 600,
        popupHeight: 600
      }, config);
      // vars
      var $elm = $(c.factorElement),
          popupW = c.popupWidth,
          popupH = c.popupHeight;
      // exit
      if($elm.length === 0){ return false; }
      // control
      $elm.each(function(){
        var self = $(this),
            name = 'POPUP',
            width = popupW,
            height = popupH,
            left = 0,
            top = 0,
            parameters,
            centeringFlag = false;
        // ポップアップを天地左右中央に配置する場合
        if(centeringFlag){
          left = (screen.width - width) / 2;
          top = (screen.height - height) / 2;
        }
        // パラメータ設定
        parameters = 'width=' + width + ',height=' + height + ',menubar=no,toolbar=no,location=yes,status=yes,scrollbars=yes,resizable=yes,left=' + left + ',screenX=' + left + ',top=' + top + ',screenY=' + top;
        // クリック制御
        self.on('click', function(){
          window.open(this.href, name, parameters);
          return false;
        });
      });
    },
    /**
     * @method rollover
     * - ロールオーバー
     */
    rollover: function(config){
      // options
      var c = $.extend({
        factorElement: '.js-rollover',
        onSuffix: '_on'
      }, config);
      // vars
      var $elm = $(c.factorElement),
          suffix = c.onSuffix;
      // exit
      if($elm.length === 0 || !u.isDesktop()){ return false; }
      // function
      var src = {
        over: function($elm){return $elm.attr('src').replace(/^(.+)(\.[a-z]+)$/, '$1' + suffix + '$2');},
        out: function($elm){return $elm.attr('src').replace(new RegExp('^(.+)' + suffix + '(\.[a-z]+)$' ), '$1$2');},
        preload: function($elm){return $elm.attr('src').replace(/^(.+)(\.[a-z]+)$/, '$1' + suffix + '$2');}
      };
      // control
      $elm
        .hover(function(){
          $(this).attr('src', src.over($(this)));
        }, function(){
          $(this).attr('src', src.out($(this)));
        })
        .each(function(){
          $('<img>').attr('src', src.preload($(this)));
        });
    },
    /**
     * @method rowEdgeControl
     * - 横並びの端制御
     */
    rowEdgeControl: function(config){
      // options
      var c = $.extend({
        factorElement: '.js-rowEdge',
        rowChildElement: '> *'
      }, config);
      // vars
      var $elm = $(c.factorElement),
          rowChild = c.rowChildElement,
          edgeName = 'is-edge',
          fsWatch = true,
          wsWatch = true;
      // exit
      if($elm.length === 0){ return false; }
      // function
      var init = function(){
        $elm.each(function(){
          var parent = $(this),
              childen = parent.find(rowChild),
              num = childen.length,
              eOffset,
              gOffset;
          childen.removeClass(edgeName);
          childen.eq(num-1).addClass(edgeName);
          childen.each(function(){
            var self = $(this);
            eOffset = parseInt(self.offset().top);
            if(gOffset !== eOffset){
              self.prev().addClass(edgeName);
              gOffset = eOffset;
            }
          });
        });
      };
      // init：文字可変・リサイズへの対応可否
      if(fsWatch){ u.isFontSizeWatch(init); } else { init(); }
      if(wsWatch){ u.isWindowSizeWatch(init); } else { init(); }
    },
    /**
     * @method fontSizeControl
     * - 文字サイズ切り替え
     * @requires jquery.cookie.js
     */
    fontSizeControl: function(config){
      // options
      var c = $.extend({
        factorElement: '.js-fontSize',
        changeTriggerPrefix: 'js-fontSize_',
        fontSizeSmallElement: '.js-fontSize_small',
        fontSizeMediumElement: '.js-fontSize_medium',
        fontSizeLargeElement: '.js-fontSize_large',
        cookieExpires: 365
      }, config);
      // vars
      var $elm = $(c.factorElement),
          $changeTrigger = $elm.find('a[class*="' + c.changeTriggerPrefix + '"]'),
          $fontSmallTrigger = $elm.find(c.fontSizeSmallElement),
          $fontMediumTrigger = $elm.find(c.fontSizeMediumElement),
          $fontLargeTrigger = $elm.find(c.fontSizeLargeElement),
          $body = $('body'),
          smallName = 'is-font-small',
          mediumName = 'is-font-medium',
          largeName = 'is-font-large',
          activeName = u.state.active,
          cookie_fontsize = {
            name: 'cookie_fontsize',
            expires: c.cookieExpires,
            path: '/'
          };
      // exit
      if($elm.length === 0){ return false; }
      // function：文字サイズ設定
      var fontSizeSet = function(setSize){
        switch(setSize){
          case 'small':
            $changeTrigger.removeClass(activeName);
            $fontSmallTrigger.addClass(activeName);
            $body.removeClass(mediumName + ' ' + largeName);
            $body.addClass(smallName);
            break;
          case 'medium':
            $changeTrigger.removeClass(activeName);
            $fontMediumTrigger.addClass(activeName);
            $body.removeClass(smallName + ' ' + mediumName + ' ' + largeName);
            break;
          case 'large':
            $changeTrigger.removeClass(activeName);
            $fontLargeTrigger.addClass(activeName);
            $body.removeClass(smallName + ' ' + mediumName);
            $body.addClass(largeName);
            break;
          default:
            break;
        }
      };
      // setting：文字サイズ初期設定
      if($.cookie(cookie_fontsize.name)){
        var setSize = $.cookie(cookie_fontsize.name);
        fontSizeSet(setSize);
      } else {
        $fontMediumTrigger.addClass(activeName);
      }
      // control：文字サイズ変更ボタン制御
      $changeTrigger.on('click', function(){
        // 設定したい文字サイズ
        var setSize = $(this).attr('class').split(c.changeTriggerPrefix)[1];
        // cookieの設定
        $.cookie(cookie_fontsize.name, setSize, {
          path: cookie_fontsize.path,
          expires: cookie_fontsize.expires
        });
        // 文字サイズ設定
        fontSizeSet(setSize);
      });
    },
    /**
     * @method modalControl
     * - モーダル制御
     * @requires jquery.colorbox.js
     */
    modalControl: function(config){
      // options
      var c = $.extend({
        factorPrefix: 'js-modal-',
        modalPhotoElement: '.js-modal-photo',
        modalInlineElement: '.js-modal-inline',
        modalAjaxElement: '.js-modal-ajax',
        modalIframeElement: '.js-modal-iframe',
        modalYoutubeElement: '.js-modal-youtube',
        modalProfileElement: '.js-modal-profile',
        customizeTriggerElement: '.js-modal-custom_inline'  // カスタマイズ用（例：「.js-modal-xxxxx」）
      }, config);
      // vars
      var $elm = $('[class*=' + c.factorPrefix + ']'),
          $photoTrigger = $(c.modalPhotoElement),
          $inlineTrigger = $(c.modalInlineElement),
          $ajaxTrigger = $(c.modalAjaxElement),
          $iframeTrigger = $(c.modalIframeElement),
          $youtubeTrigger = $(c.modalYoutubeElement),
          $profileTrigger = $(c.modalProfileElement),
          baseW_pc = 1000,
          baseH_pc = false,
          baseW_sp = '90%',
          baseH_sp = window.innerHeight*0.9,
          photoOption = { className: c.modalPhotoElement.split('js-')[1], maxWidth: "90%", maxHeight: "90%" },
          inlineOption = { className: c.modalInlineElement.split('js-')[1], inline: true, width: u.isRangePC() ? baseW_pc : baseW_sp, height: u.isRangePC() ? baseH_pc : baseH_pc },
          ajaxOption = { className: c.modalAjaxElement.split('js-')[1], width: u.isRangePC() ? baseW_pc : baseW_sp, height: u.isRangePC() ? baseH_pc : baseH_sp },
          iframeOption = { className: c.modalIframeElement.split('js-')[1], iframe: true, width: u.isRangePC() ? baseW_pc : baseW_sp, height: u.isRangePC() ? 500 : baseH_sp },
          youtubeOption = { className: c.modalYoutubeElement.split('js-')[1], iframe: true, width: u.isRangePC() ? baseW_pc : baseW_sp, height: u.isRangePC() ? baseW_pc*0.5625 : window.innerWidth*0.9*0.5625 },
          profileOption = { className: c.modalProfileElement.split('js-')[1], inline: true, width: u.isRangePC() ? 600 : "100%", height: u.isRangePC() ? false : false, opacity: 0.8 };
      // exit
      if($elm.length === 0){ return false; }
      // init
      $photoTrigger.colorbox(photoOption);
      $inlineTrigger.colorbox(inlineOption);
      $ajaxTrigger.colorbox(ajaxOption);
      $iframeTrigger.colorbox(iframeOption);
      $youtubeTrigger.colorbox(youtubeOption);
      $profileTrigger.colorbox(profileOption);
      
      // modal in slider
      if($(".js-slider-modal_Inner01").length !== 0){
        var slider = $('.js-slider-modal_Inner01').slick({
          arrows: true,
          dots: true,
          infinite: true,
          autoplay: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          customPaging: function(slider, i) {
          var thumbSrc = $(slider.$slides[i]).find('img').attr('src');
          return '<img src="' + thumbSrc + '">';
          },
          responsive: [
            {
              breakpoint: u.breakPoint1 + 1,
              settings: {
              arrows: true,
              speed: 300,
              slidesToShow: 1,
              slidesToScroll: 1
              }
            }
          ]
        });
        var $customizeTrigger = $(c.customizeTriggerElement),
          prefix = c.factorPrefix,
          customizeOption = {
            'custom_inline': {
              inline: true,
              className: "modal_Inner01_box",
              width: u.isRangePC() ? baseW_pc : '100%',
              height: u.isRangePC() ? false : false,
                onLoad:function(){
                  $('.modal-area').show();
                  slider.slick('setPosition');
                },
                onComplete:function(){
                  slider.css('opacity',0);
                  slider.animate({'z-index':1},300,function(){
                    slider.slick('setPosition');
                    slider.animate({'opacity':1});
                  });
                },
                onCleanup:function(){
                  $('.modal-area').hide();
                },
            },
          };
        if($customizeTrigger.length){
          var key = c.customizeTriggerElement.split(prefix)[1];
          $('.' + prefix + key).colorbox(customizeOption[key]);
        }
      }
    },
    /**
     * @method sliderControl
     * - スライダー制御
     * @requires slick.js
     */
    sliderControl: function(config){
      // options
      var c = $.extend({
        factorPrefix: 'js-slider-',
        sliderNames: ['hero', 'banner', 'banner02', 'photo', 'vehiclePhoto', 'modal']  // スライダーパターン（例：「.js-slider-xxxxx」を追加する場合、['hero', 'banner', 'xxxxx']を指定。もしくは別でメソッドを呼び出して実行する。）
      }, config);
      // vars
      var $elm = $('[class*=' + c.factorPrefix + ']'),
          prefix = c.factorPrefix,
          sliders = c.sliderNames,
          bp1 = u.breakPoint1 + 1;
      // exit
      if($elm.length === 0){ return false; }
      // settings
      var settings = {
        'hero': {
          arrows: false,
          dots: true,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 4000,
          speed: 1000,
          slidesToShow: 1,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: bp1,
              settings: {
                speed: 500
              }
            }
          ]
        },
        'banner': {
          arrows: false,
          dots: true,
          autoplay: true,
          autoplaySpeed: 4000,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: bp1,
              settings: {
                arrows: false,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        },
        'banner02': {
          arrows: false,
          dots: true,
          infinite: true,
          autoplay: true,
          autoplaySpeed:5000,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 4,
          responsive: [
            {
              breakpoint: bp1,
              settings: {
                arrows: false,
                speed: 300,
                slidesToShow: 2,
                slidesToScroll: 2
              }
            }
          ]
        },
        'photo': {
          arrows: false,
          dots: true,
          infinite: true,
          autoplay: false,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: bp1,
              settings: {
                arrows: true,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        },
        'vehiclePhoto': {
          arrows: false,
          dots: true,
          infinite: true,
          autoplay: true,
          autoplaySpeed:5000,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: bp1,
              settings: {
                arrows: true,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        },
        'modal': {
          arrows: false,
          dots: true,
          infinite: true,
          autoplay: false,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: bp1,
              settings: {
                arrows: false,
                speed: 300,
                slidesToShow: 2,
                slidesToScroll: 1
              }
            }
          ]
        }
      };
      // init：配列slidersに設定した名前ごとにスライダー実行
      for(var i=0; i<sliders.length; i++){
        var slider = $('.' + prefix + sliders[i]);
        if(slider.length !== 0){
          switch(sliders[i]){
            case 'hero':
              slider.slick(settings.hero);
              break;
            case 'banner':
              slider.slick(settings.banner);
              break;
            case 'banner02':
              slider.slick(settings.banner02);
              break;
            case 'photo':
              slider.slick(settings.photo);
              break;
            case 'vehiclePhoto':
              slider.slick(settings.vehiclePhoto);
              break;
            case 'modal':
              slider.slick(settings.modal);
              break;
            // カスタマイズ用オプションは以下の体裁で追加
            /*
            case 'xxxxx':
              slider.slick(settings.xxxxx);
              break;
            */
            default:
              break;
          }
        }
      }
      
      // arrow option
      if($(".banner-slider_contents").length !== 0){
        $(".banner-slider_contents .slick-dots").before('<div class="slick-custom-prev"></div>');
        $(".banner-slider_contents .slick-dots").after('<div class="slick-custom-next"></div>');
        $('.banner-slider_contents .slick-custom-prev').on('click', function(){
          $(".banner-slider_contents").slick('slickPrev');
        });
        $('.banner-slider_contents .slick-custom-next').on('click', function(){
          $(".banner-slider_contents").slick('slickNext');
        });
      }
      if($(".banner-station-slider_contents").length !== 0){
        $(".banner-station-slider_contents .slick-dots").before('<div class="slick-custom-prev"></div>');
        $(".banner-station-slider_contents .slick-dots").after('<div class="slick-custom-next"></div>');
        $('.banner-station-slider_contents .slick-custom-prev').on('click', function(){
          $(".banner-station-slider_contents").slick('slickPrev');
        });
        $('.banner-station-slider_contents .slick-custom-next').on('click', function(){
          $(".banner-station-slider_contents").slick('slickNext');
        });
      }
      if($(".carousel_contents").length !== 0){
        $(".carousel_contents .slick-dots").before('<div class="slick-custom-prev"></div>');
        $(".carousel_contents .slick-dots").after('<div class="slick-custom-next"></div>');
        $('.carousel_contents .slick-custom-prev').on('click', function(){
          $(".carousel_contents .js-slider-photo").slick('slickPrev');
        });
        $('.carousel_contents .slick-custom-next').on('click', function(){
          $(".carousel_contents .js-slider-photo").slick('slickNext');
        });
      }
      if($(".photo-gallery_contents").length !== 0){
        $(".photo-gallery_contents .slick-dots").before('<div class="slick-custom-prev"></div>');
        $(".photo-gallery_contents .slick-dots").after('<div class="slick-custom-next"></div>');
        $('.photo-gallery_contents .slick-custom-prev').on('click', function(){
          $(".js-slider-modal").slick('slickPrev');
        });
        $('.photo-gallery_contents .slick-custom-next').on('click', function(){
          $(".js-slider-modal").slick('slickNext');
        });
      }
      
    },
    /**
     * @method headerControl
     * - ヘッダー制御
     */
    headerControl: function(config){
      // options
      var c = $.extend({
        headerElement: '#header.Header'
      }, config);
      // vars
      var $elm = $(c.headerElement),
          $navList = $elm.find('.gnavList > li > a').not('.gnavList > li.nov > a'),
          $navList_SP_menu = $elm.find('.gnavList.box01 > li > a, .gnavList.box02 > li > a').not('.gnavList > li.nov > a'),
          $navList_SP_sub = $elm.find('.gnavList.box03 > li > a'),
          $megaNavList = $elm.find('.megaMenuList > li > a'),
          nav1st = $(".megadrop-block"),
          nav2st = $(".megadrop-type02-block_inner"),
          $menuBtn = $(".gnavMenu-button"),
          $menu_SP = $("#gnavBody > .gnavInner"),
          $closeBtn = nav1st.find(".megadrop-close"),
          $closeBtn_SP = $(".gnavList.box02 .close a"),
          $grayBG = $("#grayBG"),
          window_W = u.$win.width(),
          window_size = 768,
          speed = 300,
          noFixedClass = "noFixed",
          hiddenClass = "is-hidden",
          locationClass = "is-location",
          activeClass = u.state.active;
      // exit
      if($elm.length === 0){ return false; }
      
      var $header_H = function(){
        if(u.isRangePC()){
          if(u.$win.height() < 700){
            $elm.addClass(noFixedClass);
          } else {
            $elm.removeClass(noFixedClass);
          }
        }
      };
      var $headerAct = function(){
        if(window_W > window_size){
          // PC
          // function
          var allOFF = function(){
            $navList.parent().removeClass(activeClass);
            $navList.next(nav1st).removeClass(activeClass);
          };
          
          // gnav load
          var $pathname = location.pathname.split("/")[1],
              $pathname_02 = location.pathname;
          if($pathname === "ride") {
             $('.gnavList > li').eq(0).addClass(locationClass);
          } else if($pathname === "visit") {
             $('.gnavList > li').eq(1).addClass(locationClass);
          } else if($pathname === "live") {
             $('.gnavList > li').eq(2).addClass(locationClass);
          } else if($pathname_02 === "/company/ir/ir_koukoku.html") {
             $('.gnavList.box02 > li').eq(1).addClass(locationClass);
          } else if($pathname === "company") {
             $('.gnavList.box02 > li').eq(0).addClass(locationClass);
          } else if($pathname === "ir") {
             $('.gnavList.box02 > li').eq(1).addClass(locationClass);
          }
          
          // gnav slide
          $navList.on("click.navList_PC", function(){
            var $this = $(this);
            if($this.parent().hasClass(activeClass)){
              $this.parent().removeClass(activeClass);
              $this.next(nav1st).removeClass(activeClass);
            } else {
              $navList.parent().removeClass(activeClass);
              $navList.next(nav1st).removeClass(activeClass);
              $this.parent().addClass(activeClass);
              $this.next(nav1st).addClass(activeClass);
            }
          });
         
          // close
          $closeBtn.on("click.close_PC", function(){
            allOFF();
          });
          $(document).on('click touchend', function(event) {
            if (!$(event.target).closest($elm).length) {
              allOFF();
            }
          });
          // megamenu slide
          if($megaNavList.next(nav2st).length !== 0){
            $megaNavList.hover(function(){
              $(this).parent().addClass(activeClass);
              $(this).next(nav2st).addClass(activeClass);
            },function(){
              $(this).parent().removeClass(activeClass);
              $(this).next(nav2st).removeClass(activeClass);
            });
            nav2st.hover(function(){
              $(this).addClass(activeClass);
            },function(){
              $(this).removeClass(activeClass);
            });
          }
        } else {
          // SP
          var nav01_OFF = function(){
            $menuBtn.removeClass(activeClass);
            $menu_SP.stop().fadeOut(speed);
            //$("body").removeClass(hiddenClass);
          };
          var nav02_OFF = function(){
            $navList_SP_sub.parent().removeClass(activeClass);
            $navList_SP_sub.next(nav1st).stop().fadeOut(speed);
          };
          
          // menu button
          $menuBtn.on("click.menuBtn_SP", function(){
            var $this = $(this);
            if($this.hasClass(activeClass)){
              $this.removeClass(activeClass);
              //$("body").removeClass(hiddenClass);
              $menu_SP.stop().fadeOut(speed);
              $grayBG.stop().fadeOut(speed);
            } else {
              nav01_OFF();
              nav02_OFF();
              $this.addClass(activeClass);
              //$("body").addClass(hiddenClass);
              $menu_SP.stop().fadeIn(speed);
              $grayBG.stop().fadeIn(speed);
            }
          });
          // menu gNav
          $navList_SP_menu.on("click.navList_menu_SP", function(){
            var $this = $(this);
            if($this.parent().hasClass(activeClass)){
              $this.parent().removeClass(activeClass);
              $this.next(nav1st).stop().slideUp(speed);
            } else {
              $this.parent().addClass(activeClass);
              $this.next(nav1st).stop().slideDown(speed);
            }
          });
          // gnav sub
          $navList_SP_sub.on("click.navList_sub_SP", function(){
            var $this = $(this);
            if($this.parent().hasClass(activeClass)){
              $this.parent().removeClass(activeClass);
              $this.next(nav1st).stop().fadeOut(speed);
              //$("body").removeClass(hiddenClass);
              $grayBG.stop().fadeOut(speed);
            } else {
              nav01_OFF();
              nav02_OFF();
              $this.parent().addClass(activeClass);
              $this.next(nav1st).stop().fadeIn(speed);
              //$("body").addClass(hiddenClass);
              $grayBG.stop().fadeIn(speed);
            }
          });
          // close
          $closeBtn_SP.on("click.close_SP", function(){
            nav01_OFF();
            $grayBG.stop().fadeOut(speed);
          });
          $grayBG.on("click.grayBG_SP", function(){
            //$("body").removeClass(hiddenClass);
            $navList.parent().removeClass(activeClass);
            $navList.next(nav1st).fadeOut(speed);
            $menuBtn.removeClass(activeClass);
            $menu_SP.stop().fadeOut(speed);
            $grayBG.stop().fadeOut(speed);
          });
        }
      };
      
      // リロード
      var widthCheck = function(){
        var winWidth = $(window).width();

        if(winWidth <= 768 && widthFlag !== 'sp') {
          if(widthFlag === 'pc'){
            location.reload();
          }
          widthFlag = 'sp';
        } else if(winWidth > 768 && widthFlag !== 'pc') {
          if(widthFlag === 'sp'){
            location.reload();
          }
          widthFlag = 'pc';
        }
      };
      
      $header_H();
      $headerAct();
      
      // resize
      var widthFlag = '';
      u.$win.on('resize', function(){
        $header_H();
        widthCheck();
      });
    },
    
    /**
     * @method footerControl
     * - フッター制御
     */
    footerControl: function(config){
      // options
      var c = $.extend({
        footerElement: '#footer.Footer'
      }, config);
      // vars
      var $elm = $(c.footerElement),
          $navList = $elm.find('.gnavList > li > a').not('.gnavList > li.nov > a'),
          nav1st = $(".megadrop-block"),
          speed = 300,
          activeClass = u.state.active;
      // exit
      if($elm.length === 0){ return false; }
      
      if(u.$win.width() < u.breakPoint1){
        // menu gNav
        $navList.on("click", function(){
          var $this = $(this);
          if($this.parent().hasClass(activeClass)){
            $this.parent().removeClass(activeClass);
            $this.next(nav1st).slideUp(speed);
          } else {
            $this.parent().addClass(activeClass);
            $this.next(nav1st).slideDown(speed);
          }
        });
      }
    },
    
    /**
     * @method reloadControl
     * - リロードボタン制御
     */
    reloadControl: function(config){
      // options
      var c = $.extend({
        reloadElement: '.reload_button'
      }, config);
      // vars
      var $elm = $(c.reloadElement);
      // exit
      if($elm.length === 0){ return false; }
      
      $elm.on("click", function(){
        location.reload();
      });
    },
    
    /**
     * @method trainInformation
     * - 運行状況制御
     */
    trainInformation: function(config){
      // options
      var c = $.extend({
        infoElement: '#infoBlock'
      }, config);
      // vars
      var $elm = $(c.infoElement);
      
      // exit
      if($elm.length === 0){ return false; }
      
    },
    /**
     * @method moreContents
     * - 情報表示制御
     */
    moreContents: function(config){
      // options
      var c = $.extend({
        morebtnElement: '.more-Contents_btn'
      }, config);
      // vars
      var $elm = $(c.morebtnElement),
          $contents = $(".more-Contents_after");
      
      // exit
      if($elm.length === 0){ return false; }
      
      $elm.on("click", function(){
        $(this).next($contents).show();
        $(this).remove();
        COMMON.module.equalHeight(true, true);
      });
    },
    
    /**
     * @method moreContents02
     * - 情報表示制御（開閉）
     */
    moreContents02: function(config){
      // options
      var c = $.extend({
        morebtnElement: '.more-Contents_btn-v2'
      }, config);
      // vars
      var $elm = $(c.morebtnElement),
          $contents = $(".more-Contents_after-v2"),
          speed = 300;
      
      // exit
      if($elm.length === 0){ return false; }
      
      $elm.on("click", function(){
        var $this = $(this),
            openText = $this.find("a").data("open-text"),
            closeText = $this.find("a").data("close-text");
        if($this.hasClass(u.state.active)){
          $this.find("a").text(openText);
          $this.next($contents).slideUp(speed);
          $this.removeClass(u.state.active);
        } else {
          $this.find("a").text(closeText);
          $this.next($contents).slideDown(speed);
          $this.addClass(u.state.active);
          COMMON.module.equalHeight(true, true);
        }
      });
    },
    
    /**
     * @method mapSlider
     * - 路線図制御
     */
    mapSlider: function(){
      // vars
      var $elm = $('.routeMap-main .routeMap-main-wrap'),
          $btn_prev = $('.routeMapBtn.prev'),
          $btn_next = $('.routeMapBtn.next');
      // exit
      if($elm.length === 0){ return false; }
      
      if(u.isRangeSP()){
        $elm.slick({
          arrows: false,
          infinite: false,
          draggable: false,
          swipe: false,
          initialSlide: 1,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1
        });
        $btn_prev.on('click', function(){
          $elm.slick('slickPrev');
        });
        $btn_next.on('click', function(){
          $elm.slick('slickNext');
        });
      }
    },
    
    /**
     * @method newsInformation
     * - ニュース制御
     */
    newsInformation: function(){
      // vars
      var $elm = $('.news-layout');
      // exit
      if($elm.length === 0){ return false; }

      $.ajax({
        type: 'GET',
        url: '/json/news.json',
        dataType: 'json',
        success: function(jsonNews){
          var lens = jsonNews.length;
          for(var i=0; i < lens; i++){
            if(jsonNews[i].blank === "F"){
             $elm.append('<article class="news_article"><a class="block" href="' + jsonNews[i].url + '"><div class="news_property"><span class="news_date">' + jsonNews[i].date + '</span></div><p class="news_title">' + jsonNews[i].title + '</p></a></article>');
            }if(jsonNews[i].blank === "T" && jsonNews[i].pdf === "F"){
             $elm.append('<article class="news_article"><a class="block" href="' + jsonNews[i].url + '" target="_blank"><div class="news_property"><span class="news_date">' + jsonNews[i].date + '</span></div><p class="news_title">' + jsonNews[i].title + '</p></a></article>');
            } else if(jsonNews[i].blank === "T" && jsonNews[i].pdf === "T"){
             $elm.append('<article class="news_article"><a class="block" href="' + jsonNews[i].url + '" target="_blank"><div class="news_property"><span class="news_date">' + jsonNews[i].date + '</span></div><p class="news_title">' + jsonNews[i].title + '（' + jsonNews[i].size + '）</p></a></article>');
            }
          }
        }
      });
    },
    
    /**
     * @method localnavControl
     * - ローカルナビ制御
     */
    localnavControl: function(){
      // vars
      var $elm = $('#localnavBox');
      // exit
      if($elm.length === 0){ return false; }
      // vars
      var $contents = $elm.find(".localnav-contents > div"),
          elmClass_Val = $elm.attr('class');
      
      if($contents.hasClass(elmClass_Val)){
        $contents.not("." + elmClass_Val).remove();
      } else {
        $contents.remove();
      }
    },
    
    /**
     * @method stationRecommendControl
     * - 駅別おすすめ情報
     */
    stationRecommendControl: function(config){
      // options
      var c = $.extend({
        factorElement: '.js-reccomend-station',
        jsonPath: '/recommend/json/recommend.json'
      }, config);
      // vars
      var $factor = $(c.factorElement),
          path = c.jsonPath;
      // exit
      if($factor.length === 0){ return false; }
      // setting
      // json
      $.ajax({
        url: path,
        dataType: 'json',
        success: function (json) {
         var len = json.length;
         var maxsize = 12;
         var counter_all = 0,
             counter_1 = 0,
             counter_2 = 0,
             counter_3 = 0,
             counter_4 = 0,
             counter_5 = 0,
             counter_6 = 0,
             counter_7 = 0;
     if (len < 1) {
        //おすすめエリアごと削除
     } else {
      for (var i in json) {
        var size = json[i].size,
            pdf = json[i].pdf,
            blank = json[i].blank,
            url = json[i].url,
            image = json[i].image,
            station = json[i].station,
            area = json[i].area,
            genre = json[i].genre,
            date = json[i].date,
            title = json[i].title;

        var stationHTML ="",
            stationVal = station.split(','),
            stationVal_count = stationVal.length;

       //link
       if (url == "") {
        var urlSet = 'noLink';
       } else {
        var urlSet = 'link';
       }

       //blank
       if (blank == "T") {
        var blankSet = 'target="_blank"';
        var blankSet2 = ' blankLink';
       } else {
        var blankSet = '';
        var blankSet2 = '';
       }

       //pdf
       if (pdf == "T") {
        var pdfSet = ' pdfLink';
        var blankSet2 = '';
       } else {
        var pdfSet = '';
       }

       //size
       if (size == "") {
        var sizeSet = '';
       } else {
        var sizeSet = '（PDF：' + size + '）';
       }



        if (urlSet == "noLink") {
          stationHTML = '<div class="banner_item"><div class="banner_link"><div class="banner_image"><img src="' + image + '" alt=""></div><div class="banner_caption"><p class="banner_title"><span class="banner_label">' + title + sizeSet + '</span></p></div></div></div>';
        } else {
          stationHTML = '<div class="banner_item"><a href="' + url + '" class="banner_link" ' + blankSet + '><div class="banner_image"><img src="' + image + '" alt=""></div><div class="banner_caption"><p class="banner_title"><span class="banner_label">' + title + sizeSet + '</span></p></div></a></div>';
        }
        if(stationVal !== ""){
          for (var n in stationVal) {
            $("[data-station='" +  stationVal[n] + "']").append(stationHTML);
          }
        }

      }
     }
        }
      //json[i].date
      }).done(function(){
        setTimeout(function(){
          var bp1 = u.breakPoint1 + 1;
          var sliderStation = $(".js-reccomend-station").slick({
          arrows: false,
          dots: true,
          infinite: true,
          autoplay: true,
          autoplaySpeed:5000,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 4,
          responsive: [
            {
              breakpoint: bp1,
              settings: {
                arrows: false,
                speed: 300,
                slidesToShow: 2,
                slidesToScroll: 2
              }
            }
          ]
          });
          if($(".banner-station-slider_contents").length !== 0){
            $(".banner-station-slider_contents .slick-dots").before('<div class="slick-custom-prev"></div>');
            $(".banner-station-slider_contents .slick-dots").after('<div class="slick-custom-next"></div>');
            $('.banner-station-slider_contents .slick-custom-prev').on('click', function(){
              $(".banner-station-slider_contents").slick('slickPrev');
            });
            $('.banner-station-slider_contents .slick-custom-next').on('click', function(){
              $(".banner-station-slider_contents").slick('slickNext');
            });
          }
        },500);
      });
    },
    
    /**
     * @method agreeCheckControl
     * - 同意チェック機能
     */
    agreeCheckControl: function(){
      // vars
      var $elm = $('.agree-box-layout'),
          $checkbox = $elm.find('.agree-checkbox'),
          $agree_btn = $elm.find('.agree-btn-application'),
          checkedClass = "is-checked";
      // exit
      if($elm.length === 0){ return false; }
      
      if($checkbox.find('input[type="checkbox"]').prop('checked')){
        $checkbox.addClass(checkedClass);
        $agree_btn.addClass(checkedClass);
      } else {
        $checkbox.removeClass(checkedClass);
        $agree_btn.removeClass(checkedClass);
      }

      $checkbox.on('click', function(){
        if($checkbox.find('input[type="checkbox"]').prop('checked')){
          $checkbox.removeClass(checkedClass);
          $checkbox.find('input[type="checkbox"]').prop('checked',false);
          $agree_btn.removeClass(checkedClass);
        } else {
          $checkbox.addClass(checkedClass);
          $checkbox.find('input[type="checkbox"]').prop('checked',true);
          $agree_btn.addClass(checkedClass);
        }
      });
    }
  };
}();


/**
 * @execution
 */
$(function(){
  'use strict';
  // onReady
  COMMON.module.initialize();
});

$(window).on('load', function(){
  'use strict';
  // onLoad
  COMMON.module.equalHeight(true, true);
  COMMON.module.modalControl();
  
  // location.hash
  var u = new COMMON.Util();
  if(u.isRangeSP()){
    if(location.hash){
      var hash = window.location.hash,
          headerHeight = $("#header").innerHeight(),
          position = $(hash).offset().top - headerHeight;
      $('html, body').animate({
        scrollTop : position
      }, 0);
    }
  }
});
