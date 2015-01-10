game.module(
    'game.main'
).require(
    'game.assets',
    'game.objects'
).body(function() {

    game.createScene('Main', {
        gravity: 1000,
		backgroundColor: 0xb9bec7,

        init: function() {
            this.world = new game.World(0, this.gravity);
            this.player = new game.Player(200, 200);
			this.ball = new game.Ball(232, 200);
        },

        mousedown: function() {
            this.player.jump();
        }
    });

});
