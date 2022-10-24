// Made for version 1.1 (rev 4526)

(function() {
	const melvor_hcco_significant_digits = 4;

	function significant_digits(n, places=2) {
		let sd = 0;
		if ((n > 0.89) && (n < 0.91)) return sd+places;
		const s = String(n).replace("0.", "")
		while (s[sd] == "9" || s[sd] == "0") sd++;
		return sd+places;
	}
	function chance_to_hit(offender_acc, defender_ev) {
		return (defender_ev > offender_acc) ? 0.5*offender_acc/defender_ev : 1-0.5*defender_ev/offender_acc;
	}

	var player_chanceToHitUpdater = () => {
		if (game === undefined) return;
		if ($("#combat-player-chance-to-hit") && !(game.isPaused)) {
			let player_accuracy = game.combat.player.valueOf().stats.accuracy;
			let enemy_evasion = game.combat.enemy.valueOf().stats.evasion[game.combat.player.attackType];

			let chance = chance_to_hit(player_accuracy, enemy_evasion);
			let places = significant_digits(chance, melvor_hcco_significant_digits);

			$("#combat-player-chance-to-hit").css("display", "none");
			if ($("#combat-player-chance-to-hit-better")[0] === undefined) {
				let combat_player_chance_to_hit = $("<h5>", { id: "combat-player-chance-to-hit-better", class: "font-w600 font-size-sm text-combat-smoke text-right m-1" });
				combat_player_chance_to_hit.appendTo($("#combat-player-chance-to-hit").parent()[0]);
			}
			$("#combat-player-chance-to-hit-better").html((100*chance).toFixed(places-2) + "%");
		}
	};

	var enemy_chanceToHitUpdater = () => {
		if (game === undefined) return;
		if ($("#combat-enemy-chance-to-hit") && !(game.isPaused)) {
			let enemy_accuracy = game.combat.enemy.valueOf().stats.accuracy;
			let player_evasion = game.combat.player.valueOf().stats.evasion[game.combat.enemy.attackType];

			let chance = chance_to_hit(enemy_accuracy, player_evasion);
			let places = significant_digits(chance, melvor_hcco_significant_digits);

			$("#combat-enemy-chance-to-hit").css("display", "none");
			if ($("#combat-enemy-chance-to-hit-better")[0] === undefined) {
				let combat_enemy_chance_to_hit = $("<h5>", { id: "combat-enemy-chance-to-hit-better", class: "font-w600 font-size-sm text-combat-smoke text-right m-1" });
				combat_enemy_chance_to_hit.appendTo($("#combat-enemy-chance-to-hit").parent()[0]);
			}
			$("#combat-enemy-chance-to-hit-better").html((100*chance).toFixed(places-2) + "%");
		}
	};

	console.log("[melvor_hcco/chance_to_hit_precision] Loading...");
	setTimeout( () => setInterval(enemy_chanceToHitUpdater, 50), 5000 );
	setTimeout( () => setInterval(player_chanceToHitUpdater, 50), 5000 );
	console.log("[melvor_hcco/chance_to_hit_precision] Done!");
})();
