#!/bin/bash

WROKSPACE=$(pwd)
OS=$1
ARCH=$2
TARGET=$3

if [[ -z "${OS}" ]]; then
    echo "argment [os] is empty"
    exit 1
fi

if [[ -z "${ARCH}" ]]; then
    echo "argment [arch] is empty"
    exit 1
fi

if [[ -z "${TARGET}" ]]; then
    echo "argment [arch] is empty"
    exit 1
fi

echo "Setup Artifact By: ZhenXin"

echo "WorkSpace: ${WROKSPACE}"
echo "OS: ${OS}"
echo "Arch: ${ARCH}"
echo "Target: ${TARGET}"

RELEASE_DIR="${WROKSPACE}/src-tauri/target/${TARGET}/release"
ARTIFACT_DIR="${WROKSPACE}/artifacts/${OS}-${ARCH}"
ARTIFACT_FILE="amcl-${OS}-${ARCH}"

mkdir -p "$ARTIFACT_DIR"

if [[ "${OS}" == "ubuntu" ]]; then
    tar -zcvf "$ARTIFACT_DIR"/"$ARTIFACT_FILE".tar.gz -C "$RELEASE_DIR" armoe-minecraft-launcher
    cp -r "$RELEASE_DIR"/bundle/deb/*.deb "$ARTIFACT_DIR"/"$ARTIFACT_FILE".deb
    echo "Done!"
    exit 0
elif [[ "${OS}" == "macos" ]]; then
    tar -zcvf "$ARTIFACT_DIR"/"$ARTIFACT_FILE".tar.gz -C "$RELEASE_DIR"/bundle/macos Armoe\ Minecraft\ Launcher.app
    cp -r "$RELEASE_DIR"/bundle/dmg/*.dmg "$ARTIFACT_DIR"/"$ARTIFACT_FILE".dmg
    echo "Done!"
    exit 0
fi

echo "Not Support OS ${OS}"
exit 1
