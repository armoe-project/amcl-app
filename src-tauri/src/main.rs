#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{Manager, PhysicalSize, Size};
use window_shadows::set_shadow;

fn main() {
    let builder = tauri::Builder::default().setup(|app| {
        let window = app.get_window("main").unwrap();
        if cfg!(not(target_os = "macos")) {
            window.set_decorations(false).unwrap();
            window
                .set_size(Size::Physical(PhysicalSize {
                    width: 820,
                    height: 461,
                }))
                .unwrap();
        }
        #[cfg(not(target_os = "linux"))]
        set_shadow(&window, true).unwrap();
        window.show().unwrap();
        Ok(())
    });

    builder
        .run(tauri::generate_context!())
        .unwrap_or(runtime_error())
}

fn runtime_error() {
    #[cfg(target_os = "windows")]
    let url = "https://amcl.armoe.cn/install/windows.html";
    #[cfg(target_os = "macos")]
    let url = "https://amcl.armoe.cn/install/macos.html";
    #[cfg(target_os = "linux")]
    let url = "https://amcl.armoe.cn/install/linux.html";
    open::that(url).unwrap();
    std::process::exit(0)
}
