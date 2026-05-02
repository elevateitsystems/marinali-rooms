import { SettingsService } from "@/lib/services/settingsService";

export default async function ThemeInjector() {
  const settings = await SettingsService.getSettings();

  return (
    <style dangerouslySetInnerHTML={{ __html: `
      :root {
        --primary-color: ${settings.primaryColor};
        --secondary-color: ${settings.secondaryColor};
        --background: ${settings.backgroundColor};
        --background-color: ${settings.backgroundColor};
        --foreground: ${settings.textColor};
        --popover: ${settings.backgroundColor};
        --popover-foreground: ${settings.textColor};
        --font-primary: ${settings.fontFamily};
      }
    `}} />
  );
}
