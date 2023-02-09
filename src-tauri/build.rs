extern crate embed_resource;

fn main() {
    embed_resource::compile("amcl.rc");
    tauri_build::build()
}
