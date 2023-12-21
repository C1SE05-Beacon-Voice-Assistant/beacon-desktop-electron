!macro preInit
    File "${PROJECT_DIR}\build\python-3.9.0-amd64.exe"
    ExecWait '"$INSTDIR\python-3.9.0-amd64.exe" /quiet InstallAllUsers=1 PrependPath=1 Include_test=0'
!macroend