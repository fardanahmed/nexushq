@echo off
REM Antigravity Terminal Blindness Fix for CMD
REM Reference: https://www.reddit.com/r/GeminiAI/comments/1ppik6d/fix_for_google_antigravitys_terminal_blindness_it/

if defined ANTIGRAVITY_AGENT (
    prompt $G
    REM Reset any other noisy CMD extensions here if necessary
)
