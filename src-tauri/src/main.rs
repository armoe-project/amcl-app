#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;

fn main() {
    let builder = tauri::Builder::default().setup(|app| {
        let window = app.get_window("main").unwrap();
        #[cfg(not(target_os = "macos"))]
        window.set_decorations(false).unwrap();
        window.show().unwrap();
        Ok(())
    });

    builder
        .run(tauri::generate_context!())
        .unwrap_or(runtime_error())
}

fn runtime_error() {
    #[cfg(target_os = "windows")]
    let url = "https://amcl.armoe.cn/env/windows.html";
    #[cfg(target_os = "macos")]
    let url = "https://amcl.armoe.cn/env/macos.html";
    #[cfg(target_os = "linux")]
    let url = "https://amcl.armoe.cn/env/linux.html";
    open::that(url).unwrap();
    std::process::exit(0)
}
