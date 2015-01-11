game.module(
	'game.objects'
).require(
	'engine.renderer'
).body(function() {

	game.createClass('Player', 'Sprite', {
		interactive: true,
		active: true,
		jumpPower: 450,

		init: function(x, y) {
			this._super('player_sprite.png', x, y, {
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
				collisionGroup: 1,
				collideAgainst: 0,
				mass: 1
			});

			this.body.addShape(new game.Rectangle(16, 72));

			game.scene.world.addBody(this.body);
			game.scene.stage.addChild(this);
			game.scene.addObject(this);
		},

		update: function() {
			if (this.body.position.y >= 200) {
				this.body.velocity.y = 0;
				this.body.position.y = 200;
			}
			this.position.x = this.body.position.x;
			this.position.y = this.body.position.y;

		},

		jump: function() {
			if (this.body.position.y < 200) return;
			this.body.velocity.y = -this.jumpPower;
		}
	});

	game.createClass('Ball', 'Sprite',  {
		interactive: true,
		active: true,

		init: function(x, y) {
			this._super('ball_16.png', x, y, {
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
					x: 150,
					y: 0
				},
				collisionGroup: 1,
				collideAgainst: 0,
				mass: 1
			});

			this.body.addShape(new game.Rectangle(16, 16));

			game.scene.world.addBody(this.body);
			game.scene.stage.addChild(this);
			game.scene.addObject(this);
		},

		update: function() {
			if (this.body.position.x > game.system.width || this.body.position.x < 0) {
				this.body.velocity.x *= -1;
			}

			if (this.body.position.y > game.system.height) {
				this.body.velocity.y = -700;
			}

			this.position.x = this.body.position.x;
			this.position.y = this.body.position.y;

		}

	});

});
