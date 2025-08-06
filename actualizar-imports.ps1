# Ejecuta este script en la raíz del proyecto

Get-ChildItem -Path . -Recurse -Include *.ts,*.html | ForEach-Object {
    (Get-Content $_.FullName) -replace 'src/app/components/', 'src/app/shared/components/' | Set-Content $_.FullName
}

Write-Host "¡Imports actualizados correctamente!"