package com.txmondv.mediainterface.core.exceptions;

public class APIAccessDeniedException extends Exception {

    public APIAccessDeniedException(String reason) {
        super("[DENIED] " + reason);
    }

}
