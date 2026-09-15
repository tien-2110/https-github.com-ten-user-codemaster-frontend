@echo off
echo ==============================================
echo   Dang day ma nguon CodeMaster len GitHub...
echo ==============================================
"C:\Program Files\Microsoft Visual Studio\18\Community\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\Git\cmd\git.exe" push -u origin main
if %ERRORLEVEL% equ 0 (
    echo.
    echo ==============================================
    echo   THANH CONG! Ma nguon da duoc day len GitHub!
    echo ==============================================
) else (
    echo.
    echo [Loi] Vui long kiem tra xac thuc GitHub tren trinh duyet!
)
pause
