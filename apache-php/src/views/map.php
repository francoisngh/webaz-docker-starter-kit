<!DOCTYPE php>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meeta name="viewport" content="width=device=width, initial-scale = 1.0">
    <title>MAP HYDRO</title>
    <link rel = "strylesheet" href="https://unpkg.com/ol/ol/css">
    <script src="https://unpkg.com/ol/dist/ol.js"></script>
    <link rel="stylesheet" href="../assets/css/map.css">
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.11.0/proj4.js"></script>
  </head>

  <body>
    <div id="entete">
        <p> Escape Game </p>
        <!-- Pour envoyer la variable au JS   !-->
        <script>
            const tab_pts = <?php echo json_encode($tab_pts, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>;
            console.log("tab_pts :", tab_pts);
         </script>
    
        <?php 
          echo"<table><tr>";
          foreach ($tab_pts as $pts){
            echo "<td>".$pts['name']."</td>";
          };
          echo"</tr></table>";
       
        ?>
    </div>
    <div id="map"></div>
    <script src="../assets/js/map.js"></script>
  </body>
</html>  