<script setup>

</script>
<template class="template">

<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="wrapper">

<section class="hero-section">
    <div class="overlay">
        <h2>TaVue !</h2>
        <p>Lunettes personnalisables selon vos envies</p>
    </div>
    <img class="photo-accueil" src="img/photo-accueil.png" />
    <div class="hero-text">
    </div>
    <div class="hero-description">
      <p>A la recherche de lunettes de soleil, de vue, ou de repos, adaptées à vos besoins et envies, avec un design moderne vous correspondant ? Alors vous êtes au bon endroit, TaVue vous aide à trouver la paire de lunettes de VOS rêves tout en prenant compte vos besoins, à des prix réduits. Découvrez tous nos modèles ou créez la votre !</p>
    </div>
    <div class="purchase-section">
        <div class="line"></div>
        <p>PROCUREZ VOUS LA VOTRE EN QUELQUES CLICS DÈS À PRÉSENT</p>
        <div class="lines"></div>
    </div>
</section>

<section class="main-section">
    <div class="rectangle">
        <div class="card">
            <h3>1</h3>
            <p>MONTRE</p>
            <p>choisissez votre type de montre.</p>
        </div>
        <div class="card">
            <h3>2</h3>
            <p>PERSONNALISER</p>
            <p>créez et personnalisez votre montre selon vos envies et besoins.</p>
        </div>
        <div class="card">
            <h3>3</h3>
            <p>ACHAT</p>
            <p>ajoutez votre montre à votre panier et validez-le.</p>
        </div>
        <div class="card">
            <h3>4</h3>
            <p>PATIENCE...</p>
            <p>Un peu de patience... Votre montre vous sera distribué dans les plus bref délais.</p>
        </div>
    </div>
</section>

<div class="button-container">
<button class="custom-button"><RouterLink to="/personnaliser">PERSONNALISER</RouterLink></button>
</div>

<div class="purchase-section">
        <div class="line"></div>
        <p>EN MANQUE D’INSPIRATION ? NOS MODELES LES PLUS TENDANCE</p>
        <div class="lines"></div>
    </div>

    <div class="button-container">
    <button class="custom-button orange">VUE</button>
    <button class="custom-button green">SOLEIL</button>
    <button class="custom-button green">REPOS</button>
    </div>

<!-- rectangle 1 -->

<div class="rectangle1">
    <img src="/img/lunette1.png" alt="Image">
    <div class="text-content">
        <p>
          Ces lunettes de vue à verres transparents, seront parfaites si vous cherchez des lunettes confortables, de bonne qualité et à petit prix.
Un design discret et minimaliste qui vous accompagneront tout au long de la journée en toute tranquillité.
        </p>
        <button class="custom-button">PLUS...</button>
    </div>
</div>

<!-- rectangle 2 -->

<div class="rectangle2">
    <img src="/img/lunette2.png" alt="Image">
    <div class="text-content2">
        <p>
          Ces lunettes de vue seront parfaites pour les adeptes des écrans. Verres transparents, écran bleu, un prix abordable pour une bonne qualité avec monture confortable en titane. 
        </p>
        <button class="custom-button">PLUS...</button>
    </div>
</div>

<!-- rectangle 3 -->

<div class="rectangle3">
    <img src="/img/lunette3.png" alt="Image">
    <div class="text-content3">
        <p>
          Ces lunettes de vue seront parfaites pour les adeptes des écrans. Verres transparents, écran bleu, un prix abordable pour une bonne qualité avec monture confortable en titane. 
        </p>
        <button class="custom-button">PLUS...</button>
    </div>
</div>

<div class="button-container">
<button class="custom-button">VOIR TOUT</button>
</div>

<img src="/img/composant1.png" class="composant1" alt="Composant">
<img src="/img/composant2.png" class="composant2" alt="Composant">

<!-- footer -->

<footer class="footer">
    <div class="footer-top">
        <img src="/img/envelope.png" alt="Photo 1">
        
        <hr class="separator">
        <img src="/img/faq.png" alt="Photo 2">
        <hr class="separator">
        <img src="/img/return.png" alt="Photo 3">
    </div>
    <div class="footer-middle">
        <img src="/img/logo_tavue.png" alt="Logo" class="footer-logo">
    </div>
    <div class="footer-bottom">
        <div class="social-icons">
            <img src="/img/LinkedIn.png" alt="Icon 1">
            <img src="/img/instagram.png" alt="Icon 2">
            <img src="/img/facebook.png" alt="Icon 3">
            <img src="/img/youtube.png" alt="Icon 4">
        </div>
        <div class="footer-texts">
            <p>CGV</p>
            <p>Mentions légales</p>
            <p>Politique de confidentialité</p>
        </div>
        <div class="bottom-icons">
            <img src="/img/visa.png" alt="Bottom Icon 1">
            <img src="/img/PayPal.png" alt="Bottom Icon 2">
            <img src="/img/mastercard.png" alt="Bottom Icon 3">
        </div>
    </div>
</footer>


</div>
  </body>
</html>
</template>