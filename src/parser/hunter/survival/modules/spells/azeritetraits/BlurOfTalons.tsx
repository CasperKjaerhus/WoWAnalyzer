import React from 'react';
import Analyzer from 'parser/core/Analyzer';
import SPELLS from 'common/SPELLS';
import { calculateAzeriteEffects } from 'common/stats';
import { formatDuration, formatNumber, formatPercentage } from 'common/format';
import StatTracker from 'parser/shared/modules/StatTracker';
import BoringSpellValueText from 'interface/statistics/components/BoringSpellValueText';
import Agility from 'interface/icons/Agility';
import { ApplyBuffEvent, ApplyBuffStackEvent, EventType, FightEndEvent, RemoveBuffEvent } from 'parser/core/Events';
import Statistic from 'interface/statistics/Statistic';
import STATISTIC_CATEGORY from 'interface/others/STATISTIC_CATEGORY';

const blurOfTalonsStats = (traits: number[]) => Object.values(traits).reduce((obj, rank) => {
  const [agility] = calculateAzeriteEffects(SPELLS.BLUR_OF_TALONS.id, rank);
  obj.agility += agility;
  return obj;
}, {
  agility: 0,
});

/**
 * During Coordinated Assault, Mongoose Bite or Raptor Strike increases your Agility by X and your Speed by X for 6 sec. Stacks up to 5 times.
 *
 * Example:
 * https://www.warcraftlogs.com/reports/NTvPJdrFgYchAX1R#fight=6&type=auras&source=27&ability=277969
 */

const MAX_BLUR_STACKS = 5;

class BlurOfTalons extends Analyzer {
  static dependencies = {
    statTracker: StatTracker,
  };

  agility: number = 0;
  blurOfTalonStacks: Array<Array<number>> = [];
  lastBlurStack: number = 0;
  lastBlurUpdate: number = this.owner.fight.start_time;
  currentStacks: number = 0;

  protected statTracker!: StatTracker;

  constructor(options: any) {
    super(options);
    this.active = this.selectedCombatant.hasTrait(SPELLS.BLUR_OF_TALONS.id);
    if (!this.active) {
      return;
    }
    const { agility } = blurOfTalonsStats(this.selectedCombatant.traitsBySpellId[SPELLS.BLUR_OF_TALONS.id]);
    this.agility = agility;
    this.blurOfTalonStacks = Array.from({ length: MAX_BLUR_STACKS + 1 }, x => []);

    options.statTracker.add(SPELLS.BLUR_OF_TALONS_BUFF.id, {
      agility: this.agility,
    });
  }

  get blurOfTalonsTimesByStacks() {
    return this.blurOfTalonStacks;
  }

  get uptime() {
    return this.selectedCombatant.getBuffUptime(SPELLS.BLUR_OF_TALONS_BUFF.id) / this.owner.fightDuration;
  }

  get avgAgility() {
    const avgAgi = this.blurOfTalonStacks.reduce((sum, innerArray, outerArrayIndex) => {
      return sum + innerArray.reduce((sum, arrVal) => sum + ((arrVal * outerArrayIndex * this.agility) / this.owner.fightDuration), 0);
    }, 0);
    return avgAgi;
  }

  handleStacks(event: RemoveBuffEvent | ApplyBuffEvent | ApplyBuffStackEvent | FightEndEvent, stack: number = 0) {
    if (event.type === EventType.RemoveBuff) {
      this.currentStacks = 0;
    } else if (event.type === EventType.ApplyBuff) {
      this.currentStacks = 1;
    } else if (event.type === EventType.ApplyBuffStack) {
      this.currentStacks = event.stack;
    } else if (event.type === EventType.FightEnd) {
      this.currentStacks = stack;
    }
    this.blurOfTalonStacks[this.lastBlurStack].push(event.timestamp - this.lastBlurUpdate);
    this.lastBlurUpdate = event.timestamp;
    this.lastBlurStack = this.currentStacks;
  }

  on_byPlayer_applybuff(event: ApplyBuffEvent) {
    const spellId = event.ability.guid;
    if (spellId !== SPELLS.BLUR_OF_TALONS_BUFF.id) {
      return;
    }
    this.handleStacks(event);
  }

  on_byPlayer_applybuffstack(event: ApplyBuffStackEvent) {
    const spellId = event.ability.guid;
    if (spellId !== SPELLS.BLUR_OF_TALONS_BUFF.id) {
      return;
    }
    this.handleStacks(event);
  }

  on_byPlayer_removebuff(event: RemoveBuffEvent) {
    const spellId = event.ability.guid;
    if (spellId !== SPELLS.BLUR_OF_TALONS_BUFF.id) {
      return;
    }
    this.handleStacks(event);
  }

  on_fightend(event: FightEndEvent) {
    this.handleStacks(event, this.lastBlurStack);
  }

  statistic() {
    return (
      <Statistic
        size="flexible"
        category={STATISTIC_CATEGORY.AZERITE_POWERS}
        tooltip={(
          <>
            Blur of Talons granted <strong>{formatNumber(this.agility)}</strong> Agility per stack for <strong>{formatPercentage(this.uptime)}%</strong> of the fight.
          </>
        )}
        dropdown={(
          <>
            <table className="table table-condensed">
              <thead>
                <tr>
                  <th>Stacks</th>
                  <th>Time (m:s)</th>
                  <th>Time (%)</th>
                  <th>Agility gained</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(this.blurOfTalonsTimesByStacks).map((e, i) => (
                  <tr key={i}>
                    <th>{i}</th>
                    <td>{formatDuration(e.reduce((a: number, b: number) => a + b, 0) / 1000)}</td>
                    <td>{formatPercentage(e.reduce((a: number, b: number) => a + b, 0) / this.owner.fightDuration)}%</td>
                    <td>{formatNumber(this.agility * i)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      >
        <BoringSpellValueText spell={SPELLS.BLUR_OF_TALONS}>
          <>
            <Agility /> {formatNumber(this.avgAgility)} <small>average Agility</small>
          </>
        </BoringSpellValueText>
      </Statistic>
    );
  }
}

export default BlurOfTalons;
