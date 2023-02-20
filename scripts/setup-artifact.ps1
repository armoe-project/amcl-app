$WORKSPACE = [Environment]::CurrentDirectory
$OS = $args[0]
$ARCH = $args[1]
$TARGET = $args[2]

if (!$OS) {
     Write-Host "argment [os] is empty."
     exit 1
}

if (!$ARCH) {
     Write-Host "argment [arch] is empty."
     exit 1
}

if (!$TARGET) {
     Write-Host "argment [target] is empty."
     exit 1
}

Write-Host "Setup Artifact By: ZhenXin"

Write-Host "WorkSpace: ${WROKSPACE}"
Write-Host "OS: ${OS}"
Write-Host "Arch: ${ARCH}"
Write-Host "Target: ${TARGET}"

if ($OS -eq "windows") {
     $RELEASE_DIR = "$WORKSPACE\src-tauri\target\$TARGET\release"
     $ARTIFACT_DIR = "$WORKSPACE\artifacts\$OS-$ARCH"
     $ARTIFACT_FILE = "amcl-$OS-$ARCH.zip"
     New-Item -ItemType Directory -Path "$ARTIFACT_DIR" -Force
     Compress-Archive -Path "$RELEASE_DIR\Armoe Minecraft Launcher.exe" "$ARTIFACT_DIR\$ARTIFACT_FILE"
     Write-Host "Done!"
     exit 0
}

Write-Host "Not Support OS ${OS}"
exit 1
