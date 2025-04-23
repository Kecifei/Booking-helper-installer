# Booking Helper Installer for Edge
$extensionPath = "C:\BookingHelper"
$registryPath = "HKLM:\Software\Policies\Microsoft\Edge\ExtensionInstallForcelist"
$extensionId = "bhnfkkdjpahlbkllfnmegmpiekkpofen"
# Create local folder if it doesn't exist
if (!(Test-Path $extensionPath)) {
   New-Item -ItemType Directory -Force -Path $extensionPath
}
# Download the extension files from GitHub Pages
Invoke-WebRequest -Uri "https://kecifei.github.io/booking-helper-installer/extensions/manifest.json" -OutFile "$extensionPath\manifest.json"
Invoke-WebRequest -Uri "https://kecifei.github.io/booking-helper-installer/extensions/content.js" -OutFile "$extensionPath\content.js"
Invoke-WebRequest -Uri "https://kecifei.github.io/booking-helper-installer/extensions/icon.png" -OutFile "$extensionPath\icon.png"
# Register the extension in Edge policies
if (!(Test-Path $registryPath)) {
   New-Item -Path $registryPath -Force | Out-Null
}
Set-ItemProperty -Path $registryPath -Name "1" -Value "$extensionId;file:///$extensionPath/"
Write-Output "Booking Helper installed successfully. Please restart Edge."
