var chatbot = (function($){
	var $chat = $('.chatbot-container');
	var $chatbotContent = $('.chatbot-content');
	var $closeChatbot = $('.close_chatbot');
	var $startChatbot = $('.open-chatbot');
	var $addMessage = $('.add-message');
	var $systemMsg = $('.msg-auto-system').find('.msg-content');

	var isChatOpend = function () {
		return !$chat.hasClass('hidden');
	}

	var msgTemp = function (msg, sender) {
		var senderType = sender == "user" ? "user" : "agent";
		var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
		return [
			'<div class="msg msg-'+ senderType +'">',
				'<div class="msg-content">',
					'<div>' + msg + '</div>',
					'<span><small>' + date + '</small></span>',
				'</div>',
			'</div>'
		].join(' ');
	}

	var scrollChatToBottom = function () {
		//$chatbotContent.scrollTop($chatbotContent[0].scrollHeight);
		$chatbotContent.animate({scrollTop: $chatbotContent.prop("scrollHeight")}, 400);
	}

	var init = function () {
		scrollChatToBottom();
		$startChatbot.attr('disabled', isChatOpend() ? true : false).on('click', startChat);
		$addMessage.on('keydown', sendMessage);
		$systemMsg.on('click', applySystemMsg);
		$closeChatbot.on('click', closeChat);
	}

	var sendMessage = function(evt) {
		if (!evt.shiftKey && evt.keyCode === 13) {
			evt.preventDefault();
			var msgVal = evt.target.value;
			appendMsg(msgVal, "user");
			evt.target.value = '';
     	}
	}

	var appendMsg = function (msg, sender) {
		var template = msgTemp(msg, sender);
		$chatbotContent.append(template);
		scrollChatToBottom();
	}

	var applySystemMsg = function (evt) {
		evt && evt.preventDefault();
		var msgText = evt.currentTarget.innerText;
		appendMsg(msgText, "user");
	}

	var closeChat = function (evt) {
		evt && evt.preventDefault();
		$chat.addClass('hidden');
		$startChatbot.attr('disabled', false)
	}

	var startChat = function (evt) {
		evt && evt.preventDefault();
		$(evt.target).attr('disabled', true);
		$chat.removeClass('hidden');
	}


	return {
		init
	}
})(jQuery);

chatbot.init();