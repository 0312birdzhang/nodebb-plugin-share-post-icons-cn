'use strict';

/* global $, window, document, ajaxify, app, config */

$(document).ready(function () {
	var url = window.location.protocol + '//' + window.location.host + config.relative_path;
	var title = document.title;
	$(window).on('action:ajaxify.end', function () {
		if (ajaxify.data.template.topic) {
			insertSocialIcons();

			$(window).on('action:posts.loaded', function (ev, data) {
				for (var i in data.posts) {
					if (data.posts.hasOwnProperty(i)) {
						var pid = data.posts[i].pid;
						insertSocialIcons(pid);
					}
				}
			});

			$('#content')
			.off('click', '[component="share/linkedin"]').on('click', '[component="share/linkedin"]', function (ev) {
				var pid = $(this).parents('[data-pid]').attr('data-pid');
				var urlToPost = encodeURIComponent(url + '/post' + (pid ? '/' + (pid) : ''));
				var shareURL = 'https://www.linkedin.com/shareArticle?mini=true&url=' + urlToPost;
				window.open(shareURL, '_blank', 'width=550,height=550,scrollbars=no,status=no');
				return false;
			})
			.off('click', '[component="share/weibo"]').on('click', '[component="share/weibo"]', function (ev) {
				var pid = $(this).parents('[data-pid]').attr('data-pid');
				var urlToPost = encodeURIComponent(url + '/post' + (pid ? '/' + (pid) : ''));
				var shareURL = 'http://v.t.sina.com.cn/share/share.php?title='+ title +'&url=' + urlToPost;
				window.open(shareURL, '_blank', 'width=550,height=550,scrollbars=no,status=no');
				return false;
			})
			.off('click', '[component="share/wechat"]').on('click', '[component="share/wechat"]', function (ev) {
				var pid = $(this).parents('[data-pid]').attr('data-pid');
				var urlToPost = encodeURIComponent(url + '/post' + (pid ? '/' + (pid) : ''));
				var shareURL = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + urlToPost;
				window.open(shareURL, '请用微信扫描二维码分享', 'width=300,height=300,scrollbars=no,status=no');
				return false;
			})
			.off('click', '[component="share/qq"]').on('click', '[component="share/qq"]', function (ev) {
				var pid = $(this).parents('[data-pid]').attr('data-pid');
				var urlToPost = encodeURIComponent(url + '/post' + (pid ? '/' + (pid) : ''));
				var shareURL = 'http://connect.qq.com/widget/shareqq/index.html?title='+ title +'&url=' + urlToPost;
				window.open(shareURL, '_blank', 'width=550,height=550,scrollbars=no,status=no');
				return false;
			})
			.off('click', '[component="share/douban"]').on('click', '[component="share/douban"]', function (ev) {
				var pid = $(this).parents('[data-pid]').attr('data-pid');
				var urlToPost = encodeURIComponent(url + '/post' + (pid ? '/' + (pid) : ''));
				var shareURL = 'https://www.douban.com/share/service?name='+ title +'&href=' + urlToPost;
				window.open(shareURL, '_blank', 'width=550,height=550,scrollbars=no,status=no');
				return false;
			});
		}
	});

	function insertSocialIcons(pid) {
		var posts = pid ? '[component="post"][data-pid="' + pid + '"]' : '[component="post"]';
		$(posts).each(function () {
			var post = $(this);
			var share_icons_cn = $('[class="pull-right"]');
        	if(!share_icons_cn.hasClass("nodebb-plugin-share-post-icons-cn")){
				app.parseAndTranslate('partials/nodebb-plugin-share-post-icons-cn/share', {}, function (tpl) {
					$(tpl).insertBefore(post.find('.post-tools'));
				});
			}
		});
	}
});
