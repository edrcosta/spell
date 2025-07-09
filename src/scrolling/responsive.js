import Spell from '..';

export default function changeResponsiveSettings () {
    if (!Spell.window.horizontal) return;

    Spell.window.setCanvasFullWindow();

    const width = (Spell.window.horizontal(100) - Spell.scrolling.GameState.runtime.responsiveSettings.width) / 2;
    const height = (Spell.window.vertical(100) - Spell.scrolling.GameState.runtime.responsiveSettings.height) / 2;

    Spell.scrolling.GameState.persistent.position.x += width;
    Spell.scrolling.GameState.persistent.position.y += height;

    Spell.scrolling.GameState.runtime.responsiveSettings = {
        width: Spell.window.horizontal(100),
        height: Spell.window.vertical(100)
    };

    // reset player position
    if (Spell.scrolling.GameState.persistent.position.x === 0 && Spell.scrolling.GameState.persistent.position.y === 0) {
        Spell.scrolling.GameState.persistent.position.x = Spell.window.horizontal(50);
        Spell.scrolling.GameState.persistent.position.y = Spell.window.vertical(50);
    }
};
