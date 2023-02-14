#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;

fn main() {
    let builder = tauri::Builder::default().setup(|app| {
        let window = app.get_window("main").unwrap();
        if cfg!(not(target_os = "macos")) {
            window.set_decorations(false).unwrap();
        }
        window.show().unwrap();
        Ok(())
    });

    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
