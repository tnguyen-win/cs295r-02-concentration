@echo off

echo ----------------
echo 1 - call npm run build
echo 2 - call npm run serve
echo 3 - call git reset --soft HEAD~1
echo ----------------

set /P input="ENTER: "

if %input% == 1 (
	call npm run build
)

if %input% == 2 (
	call npm run serve
)

if %input% == 3 (
	call git reset --soft HEAD~1
)

echo ----------------

echo FINISHED

pause
