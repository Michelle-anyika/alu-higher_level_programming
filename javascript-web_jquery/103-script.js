$(document).ready(function () {
  function translateHello () {
    const langCode = $('#language_code').val();
    const url = 'https://www.fourtonfish.com/hellosalut/?lang=' + langCode;

    $.get(url, function (data) {
      $('#hello').text(data.hello);
    });
  }

  $('#btn_translate').click(translateHello);

  $('#language_code').keypress(function (event) {
    if (event.which === 13) { // 13 = Enter key
      translateHello();
    }
  });
});
