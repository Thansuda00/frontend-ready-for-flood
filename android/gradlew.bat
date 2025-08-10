@if "%DEBUG%" == "" @echo off
@rem ##########################################################################
@rem
@rem  Gradle startup script for Windows
@rem
@rem ##########################################################################

@setlocal

set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%

@rem Find java.exe
set JAVA_EXE=
if defined JAVA_HOME if exist "%JAVA_HOME%\bin\java.exe" set JAVA_EXE="%JAVA_HOME%\bin\java.exe"
if not defined JAVA_EXE set JAVA_EXE=java

@rem Execute Gradle wrapper
"%JAVA_EXE%" -Xmx64m -Xms64m -classpath "%APP_HOME%\gradle\wrapper\gradle-wrapper.jar" org.gradle.wrapper.GradleWrapperMain %*

@endlocal
exit /b %ERRORLEVEL%