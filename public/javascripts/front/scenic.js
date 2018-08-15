//搜索
$('#adver > div > button').click(function () {
    let siteName = $(".search").val();
    window.location.href = "/users/search?siteName=" + siteName;
});