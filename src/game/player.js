game.module(
	'game.player'
).require(
	'engine.renderer'
).body(function() {

	game.createClass('Player', 'Sprite', {
		jumpPower: 750,
		totalJumps: 2,
		jumps: 2,
		playerGround: 0,

		init: function(x, y) {
			this._super('player_sprite_2.png', x, y, {
				anchor: {
					x: 0.5,
					y: 0.5
				}
			});

			this.position = {
				x: x,
				y: y
			};

			this.body = new game.Body({
				position: {
					x: x,
					y: y
				},
				velocityLimit: {
					x: 150,
					y: 1000
				},
				velocity: {
					x: 0,
					y: 0
				},
				collisionGroup: 2,
				mass: 1.2
			});

			this.body.addShape(new game.Rectangle(5, 68));

			game.scene.world.addBody(this.body);
			game.scene.stage.addChild(this);
			game.scene.addObject(this);

			this.playerGround = game.system.height - 36 - 58;
		},

		update: function() {
			if (this.body.position.y >= this.playerGround) {
				this.body.velocity.y = 0;
				this.body.position.y = this.playerGround;
			}
			this.position.x = this.body.position.x - 3;
			this.position.y = this.body.position.y;


			if (this.body.position.y >= this.playerGround) {
				this.jumps = this.totalJumps;
			}

		},

		jump: function() {
			if (this.body.position.y < this.playerGround && this.jumps <= 0) {
				return;
			}

			if (this.jumps > 0) {
				this.body.velocity.y = -this.jumpPower;
				this.jumps--;
			}

		}
	});

});
