
interface ITheme {
  name: string;
  hexCode: string;
}

abstract class Theme implements ITheme {
  constructor(public name: string, public hexCode: string) {}

  abstract applyTheme(): void;

  getThemeInfo(): string {
    return `Theme Name: ${this.name}, Hex Code: ${this.hexCode}`;
  }
}

class LightTheme extends Theme {
  constructor() {
    super("Light Theme", "#FFFFFF");
  }

  override applyTheme(): void {
    console.log(`Applying Light Theme: ${this.getThemeInfo()}`);
  }
};

class DarkTheme extends Theme {
  constructor(){
    super("Dark Theme", "#333333");
  }

  override applyTheme(): void {
    console.log(`Applying Dark Theme: ${this.getThemeInfo()}`);
  }
};

class HighContrastTheme extends Theme {
  constructor(){
    super("High Contrast Theme", "#000000");
  }

  override applyTheme(): void {
    console.log(`Applying High Contrast Theme: ${this.getThemeInfo()}`);
  }
};

class NeonTheme extends Theme {
  constructor() {
    super("Neon Theme", "#39FF14");
  }

  override applyTheme(): void {
    console.log(`Applying Neon Theme: ${this.getThemeInfo()}`);
  }
}

enum ThemeType {
  Light = "light",
  Dark = "dark",
  HighContrast = "highcontrast",
  Neon = "neon"
}

// function to create themes based on user preference
function createTheme(themeType: keyof typeof ThemeType): Theme {
  switch (themeType) {
    case "Light":
      return new LightTheme();
    case "Dark":
      return new DarkTheme();
    case "HighContrast":
      return new HighContrastTheme();
    case "Neon":
      return new NeonTheme();
    default:
      throw new Error('Invalid theme type');
  }
}

interface IButton {
  label: string;
  onClick(): void;
};

class Button implements IButton {
  constructor(public label: string, public onClick: () => void) {}

  click(): void {
    this.onClick();
    console.log(`Button "${this.label}" clicked.`);
  }
};

class ThemeButton extends Button {
  constructor(label: string, onClick: () => void, private theme: Theme) {
    super(label, onClick);
  }

  override click(): void {
    super.click();
    this.theme.applyTheme();
  }
};

class ButtonFactory {
  static createButton(btnInfo: { label: string; onClick: () => void }, selectedTheme: keyof typeof ThemeType): ThemeButton {
    const theme = createTheme(selectedTheme);
    return new ThemeButton(btnInfo.label, btnInfo.onClick, theme);
  }
};

// Example usage:
const lightButton = ButtonFactory.createButton(
  { 
    label: "Light Mode", 
    onClick: () => console.log("Light Mode Activated") 
  }, 
  "Light");

const darkButton = ButtonFactory.createButton(
  { 
    label: "Dark Mode", 
    onClick: () => console.log("Dark Mode Activated") 
  }, 
  "Dark");

const highContrastButton = ButtonFactory.createButton(
  { 
    label: "High Contrast Mode", 
    onClick: () => console.log("High Contrast Mode Activated") 
  }, 
  "HighContrast");
  
const neonButton = ButtonFactory.createButton(
  { 
    label: "Neon Mode", 
    onClick: () => console.log("Neon Mode Activated") 
  }, 
  "Neon");

lightButton.click();
darkButton.click();
highContrastButton.click();
neonButton.click();