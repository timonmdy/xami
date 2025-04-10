package com.txmondv.mediainterface.core.configurations;

public interface ConfigEntryAccessor<T> {
    T get();

    Class<T> getType();

    T getDefaultValue();

    String getDescription();
}