/**
 * Created by adil on 06/04/17.
 */
const router = {};
router.webSocketHandleConnection = function (socket) {
  socket.on('disconnect', () => {});
};

module.exports = router;
