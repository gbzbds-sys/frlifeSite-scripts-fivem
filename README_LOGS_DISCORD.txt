FRLife Site - Logs Discord

Ce pack ajoute les logs Discord pour le site FRLife Scripts.

Ce qui est loggé :
- visite du site
- clic sur un bouton Voir produit
- clic sur Acheter / Tebex
- clic sur Discord
- clic sur une vidéo preview si un lien vidéo est ajouté

IMPORTANT :
Le webhook Discord ne doit pas être mis directement dans index.html.
Le système utilise une API Vercel : api/log.js
Le webhook doit être ajouté dans Vercel en variable d'environnement.

Configuration Vercel :

1. Ouvrir votre projet Vercel.
2. Aller dans Project Settings.
3. Aller dans Environment Variables.
4. Ajouter une variable :

Name :
DISCORD_WEBHOOK_URL

Value :
coller votre webhook Discord

Environment :
Production

5. Sauvegarder.
6. Redéployer le site.

Fichiers ajoutés / modifiés :
- api/log.js
- index.html
- README_LOGS_DISCORD.txt

Test :
Une fois le site redéployé, ouvrez le site.
Un log doit arriver dans le salon Discord configuré.
Puis cliquez sur un bouton Voir produit pour tester les logs produit.
