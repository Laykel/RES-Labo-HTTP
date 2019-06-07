<?php
  $staticAppIP = getenv('STATIC_APP');
  $dynamicAppIP = getenv('DYNAMIC_APP');
?>

<VirtualHost *:80>
        ServerName demo.res.ch

        ProxyPass '/api/jokes/' 'http://<?php print "$dynamicAppIP"; ?>/'
        ProxyPassReverse '/api/jokes/' 'http://<?php print "$dynamicAppIP"; ?>/'

        ProxyPass '/' 'http://<?php print "$staticAppIP"; ?>/'
        ProxyPassReverse '/' 'http://<?php print "$staticAppIP"; ?>/'
</VirtualHost>