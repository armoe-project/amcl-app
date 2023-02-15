#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use fltk::{
    app::{self, sleep, App},
    button,
    enums::{Color, FrameType},
    prelude::{GroupExt, WidgetBase, WidgetExt, WindowExt},
    text, window,
};
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
        .unwrap_or(create_window());
}

fn create_window() {
    let app = app::App::default();
    let mut window =
        window::Window::new(0, 0, 425, 125, "Armoe Minecraft Launcher").center_screen();
    window.set_color(Color::White);
    let mut txt = text::TextDisplay::default()
        .with_label("您可能未安装必要运行环境，点击 OK 查看帮助文档.\nYou may not have the necessary runtime environment installed.\nclick OK to view the help file.")
        .with_size(200, 10)
        .center_of_parent();
    txt.set_frame(FrameType::RFlatBox);

    let mut btn = button::Button::new(txt.x() + 50, txt.y() + 20, 80, 30, None);
    btn.set_label("OK");
    btn.set_color(Color::White);
    btn.set_frame(FrameType::BorderBox);
    window.end();
    window.show();
    window.set_callback(move |_| open_docs(app));
    btn.set_callback(move |_| open_docs(app));
    app.run().unwrap();
}

fn open_docs(app: App) {
    opener::open("https://amcl.armoe.cn/install").unwrap();
    sleep(0.1);
    app.quit();
}
