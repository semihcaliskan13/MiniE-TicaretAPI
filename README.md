# KartacaProje
Uygulama Docker ile derlenip imaj haline dönüştürülüp çalışılacak hale getirilememiştir fakat lokalde çalışabilen ve temel görevleri yapabilen bir haldedir.
<br/>
Client kısmı npm start ile başlatılabilir, arka uç tarafı için .Net projesi indirildikten sonra appsettings.json dosyasındaki "ConnectionString" geçerli MSSQL Server bağlantısı ile değiştirilerek sunucu tarafındaki rest api ayağa kaldırılabilir.
<br/>
Proje kullanımı için sayfa ilk açıldığında kullanıcıyı giriş ekranına yönlendirecektir, çünkü kullanıcının henüz bir giriş yaptığı üyeliği yoktur. Önce "Üye ol" butonu ile kayıt oluşturulur. Ardından tekrar "Giriş yap" butonuna basılıp oturum açılır.
<br/>
Yönlenilen sayfa ana sayfadır ve 3 ürün gözükür. Ürünlere teklif vermek için "Açık arttırmaya katıl" butonuna basılır. Ardından metin alanına istenen değer girilir ve "Teklif ver" butonu ile teklif verilebilir.
<br/>
SignalR bağlantısı ile veri tabanını dinleyen SQLTableDependency kütüphanesi yardımıyla veri tabanına kaydedilen bu ürün için son teklif bütün ara yüz kullanıcılarına anlık olarak iletilecektir. 
<br/>
Bunu test etmek için birkaç tane sekme ile yeni üyelikler oluşturulabilir. 
<br/>
Uygulamanın sağ üstündeki güvenlik ikonu ile CRUD işlemlerinin yapıldığı yönetici paneli tasarıma ek olarak yapılmıştır.
<br/>
Uygulamada kullanılan bileşenler;
<br/>
.Net Web API
<br/>
Microsoft SQL Server
<br/>
ReactJs
<br/>
MaterialUI
<br/>
SignalR
<br/>
Onion Architecture Mimarisi
<br/>
JWT Konfigürasyonu, Microsoft Identity ve HttpOnlyCookie ile kullanıcı ve oturum işlemleri
<br/>
Generic Repository Design Pattern
