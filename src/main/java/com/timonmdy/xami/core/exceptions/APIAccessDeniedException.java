package com.timonmdy.xami.core.exceptions;

public class APIAccessDeniedException extends Exception {

    public APIAccessDeniedException(String reason) {
        super("[DENIED] " + reason);
    }

}
