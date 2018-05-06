export default `
<!-- Code injected by SHARK-BLOG for live reload -->
<script type="text/javascript">
  if ('WebSocket' in window) {
    (function () {
      var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
      var address = protocol + window.location.host;
      var socket = new WebSocket(address);
      socket.onmessage = function (msg) {
        if (msg.data == 'reload') {
          window.location.reload();
        }
      };
      console.log('SHARK-BLOG server Live reload enabled.');
    })();
  }
</script>
`;
