package com.txmondv.xami.core.aspects;

import com.txmondv.xami.core.annotations.LoggingCommand;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

import static com.txmondv.xami.core.commands.CommandManager.logExecution;

@Aspect
@Component
public class LoggingCommandAspect {

    @Before("@annotation(loggingCommand)")
    public void logCommand(JoinPoint joinPoint, LoggingCommand loggingCommand) {
        if (!(joinPoint.getSignature() instanceof MethodSignature signature)) return;
        Method method = signature.getMethod();
        if (method == null) return;

        logExecution(method.getName());
    }
}