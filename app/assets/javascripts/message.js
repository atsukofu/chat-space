$(function() {

  function buildHTML(message) {
    if (message.image) {
      var html = `<div class="wrapper__chat-main__message-list__message-box">` +
                   `<div class="upper-message">` +
                     `<p class="upper-message__user-name">` +
                       message.user_name + 
                     `</p>` +
                     `<p class="upper-message__create-date">` +
                       message.created_at +
                     `</p>` +
                   `</div>` +
                   `<div class="lower-message">` +
                     `<p class="lower-message__message-text">` +
                       message.content +
                     `</p>` +
                     `<img src=" ` + message.image + `"  class="wrapper__chat-main__message-list__message-box__message-img">` +
                    `</div>` +
                 `</div>`
      return html;
    } else {
      var html = `<div class="wrapper__chat-main__message-list__message-box">` +
                   `<div class="upper-message">` +
                     `<p class="upper-message__user-name">` +
                       message.user_name + 
                     `</p>` +
                     `<p class="upper-message__create-date">` +
                       message.created_at +
                     `</p>` +
                   `</div>` +
                   `<div class="lower-message">` +
                     `<p class="lower-message__message-text">` +
                       message.content +
                     `</p>` +
                   `</div>` +
                 `</div>`
      return html;
    };
  }

  $('.new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.wrapper__chat-main__message-list').append(html).animate({ scrollTop: $('.wrapper__chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function() {
      $('.wrapper__chat-main__message-form__input-box__submit-btn').prop('disabled', false);
    });
  })
});

$(function(){
  function buildHTML(message) {
    if ( message.image ) {
      var html = `<div class="wrapper__chat-main__message-list__message-box" data-message-id=${message.id}>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__create-date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__message-text">
                        ${message.content}
                      </p>
                    </div>
                    <img src=${message.image} >
                  </div>`
        return html;
      } else {
      var html = `<div class="wrapper__chat-main__message-list__message-box" data-message-id=${message.id}>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__create-date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__message-text">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
        return html;
      };
    }
 
  var reloadMessages = function() {
    var last_message_id = $('.wrapper__chat-main__message-list__message-box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i,message) {
          insertHTML += buildHTML(message)
        });
        $('.wrapper__chat-main__message-list').append(insertHTML);
        $('.wrapper__chat-main__message-list').animate({ scrollTop: $('.wrapper__chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
  }
});

