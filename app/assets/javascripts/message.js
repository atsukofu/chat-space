$(function() {

  function buildHTML(message) {
    if (message.image) {
      var html = `<div class="wrapper__chat-main__message-list__message-box">` +
      `<div class="upper-message">` +
      `<p class="upper-message__user-name">` +
        message.user_name + 
      `</p>` +
      `<p class="upper-message__created-date">` +
        message.created_at +
      `</p>` +
      `</div>` +
      `<div class="lower-message">` +
      `<p class="lower-message__message-text">` +
        message.content +
      `</p>` +
      `</div>` +
      `<img src=" ` + message.image + `" class="wrapper__chat-main__message-list__message-box__message-img">` +
      `</div>`
      return html;
    } else {
      var html = `<div class="wrapper__chat-main__message-list__message-box">` +
      `<div class="upper-message">` +
      `<p class="upper-message__user-name">` +
        message.user_name + 
      `</p>` +
      `<p class="upper-message__created-date">` +
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
      $('.wrapper__chat-main__message-list').append(html).animate({ scrollTop: $('.wrapper__chat-main__message-list')[0].scrollHeight});;
      $('form')[0].reset();
      $('.wrapper__chat-main__message-form__input-box__submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
});